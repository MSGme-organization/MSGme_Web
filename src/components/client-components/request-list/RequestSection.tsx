import { getInvitations } from "@/query/request/getReq";
import { sendRequest } from "@/query/request/sendReq";
import { updateReqStatus } from "@/query/request/updateReqStatus";
import { searchUsers } from "@/query/search/searchUsers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateInvitations,
  updateInvitationStatus,
} from "@/redux/invitations/invitationsSlice";
import { updateReqUsers } from "@/redux/requestUsers/requestUserSlice";
import { DEFAULT_PROFILE_IMG } from "@/utils/data";
import { CheckedIcon, DiagonallyArrowIcon, WhiteCloseIcon } from "@/utils/svgs";
import { useMutation } from "@tanstack/react-query";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";
import Input from "../common-components/Input";
import RequestSectionNavBar from "./RequestSectionNavBar";

interface Props {
  handleActiveSection: (section: 0 | 1) => void;
}

interface userItem {
  avatar: string;
  id: string;
  bio: string;
  username: string;
  refreshInvitations: Function;
}
interface requestItem {
  id: string;
  sender: {
    avatar: string | null;
    bio: string | null;
    username: string;
    id: string;
  };
  receiver: {
    avatar: string | null;
    bio: string | null;
    username: string;
    id: string;
  };
  status: string;
  isSentBySelf: boolean;
}

const UserItem: React.FC<userItem> = React.memo(
  ({ id, avatar, username, bio, refreshInvitations }) => {
    const sendReqQuery = useMutation({
      mutationFn: sendRequest,
      onSuccess: (res: any) => {
        refreshInvitations();
      },
      onError: (error: any) => {
        console.error(error);
      },
    });

    const sendReq = () => {
      sendReqQuery.mutate({ id });
    };

    return (
      <div className="w-full p-4 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <CldImage
            src={avatar || DEFAULT_PROFILE_IMG}
            alt={`${username}'s avatar`}
            width={40}
            height={40}
            loading="lazy"
            className="rounded-full bg-green-300  aspect-square"
          />
          <div>
            <p className="font-semibold">{username}</p>
            {bio && (
              <p className="text-gray-500 dark:text-white text-[12px] font-medium leading-[14px] text-nowrap max-w-[130px] text-ellipsis overflow-hidden">
                {bio}
              </p>
            )}
          </div>
        </div>
        {!sendReqQuery.isPending ? (
          <button
            className="bg-primary px-4 text-white font-bold rounded-full text-[15px]"
            onClick={sendReq}
          >
            +
          </button>
        ) : (
          <div className="w-4 h-3">
            <div className="api-loader w-[20px]"></div>
          </div>
        )}
      </div>
    );
  }
);

const RequestItem: React.FC<requestItem> = React.memo(
  ({ id, sender, receiver, status, isSentBySelf }) => {
    const showUser = isSentBySelf ? receiver : sender;
    const dispatch = useAppDispatch();

    const updateReqStatusQuery = useMutation({
      mutationFn: updateReqStatus,
      onSuccess: (res: any) => {
        dispatch(updateInvitationStatus(res.data.data.status, id));
      },
      onError: (error: any) => {
        console.error(error);
      },
    });

    const handleAccept = () => updateReqStatusQuery.mutate({ id, status: 1 });
    const handleReject = () => updateReqStatusQuery.mutate({ id, status: 2 });

    return (
      <div className="w-full p-4 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="relative">
            <CldImage
              src={showUser.avatar || DEFAULT_PROFILE_IMG}
              alt={`${showUser.username}'s avatar`}
              width={40}
              height={40}
              loading="lazy"
              className="rounded-full bg-green-300  aspect-square"
            />
            <div
              className={`absolute top-[-2px] end-[-5px] w-4 rounded-full bg-primary text-white p-[1px] ${
                isSentBySelf ? "" : "rotate-180"
              }`}
            >
              {DiagonallyArrowIcon()}
            </div>
          </div>
          <div>
            <p className="font-semibold">{showUser.username}</p>
            {showUser.bio && (
              <p className="text-gray-500 dark:text-white text-[12px] font-medium leading-[14px] text-nowrap max-w-[130px] text-ellipsis overflow-hidden">
                {showUser.bio}
              </p>
            )}
          </div>
        </div>
        {!updateReqStatusQuery.isPending ? (
          !isSentBySelf && status === "pending" ? (
            <div className="flex gap-4">
              <button
                className="bg-primary p-1 text-white font-bold rounded-full text-[12px] capitalize"
                onClick={handleAccept}
              >
                {CheckedIcon()}
              </button>
              <button
                className="bg-primary p-1 text-white font-bold rounded-full text-[12px] capitalize"
                onClick={handleReject}
              >
                {WhiteCloseIcon()}
              </button>
            </div>
          ) : (
            <div
              className={`w-[11ch] ${
                status === "rejected" ? "bg-red-400" : "bg-primary"
              } px-4 text-white font-medium rounded-full text-[12px] capitalize`}
            >
              {status}
            </div>
          )
        ) : (
          <div className="w-4 h-3">
            <div className="api-loader w-[20px]"></div>
          </div>
        )}
      </div>
    );
  }
);

const RequestSection: React.FC<Props> = ({ handleActiveSection }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { invitationList, userList } = useAppSelector((state) => ({
    invitationList: state.invitations.invitations,
    userList: state.reqUsers?.users,
  }));
  const [searchString, setSearchString] = React.useState("");
  const [invitationActiveSection, setInvitationActiveSection] = React.useState<
    0 | 1
  >(0);

  const searchQuery = useMutation({
    mutationFn: searchUsers,
    onSuccess: (res: any) => {
      dispatch(updateReqUsers(res.data?.data?.users));
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const getInvitationsQuery = useMutation({
    mutationFn: getInvitations,
    onSuccess: (res: any) => {
      dispatch(updateInvitations(res.data?.data?.invitations));
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const switchSection = React.useCallback((section: 0 | 1) => {
    setInvitationActiveSection(section);
  }, []);

  const handleNavigation = React.useCallback(
    (path: string, state: object = {}) => {
      router.push(path, state);
    },
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    searchQuery.mutate(e.target.value);
  };

  const refreshInvitations = () => {
    getInvitationsQuery.mutate();
  };

  React.useEffect(() => {
    searchQuery.mutate(searchString);
    getInvitationsQuery.mutate();
  }, []);

  return (
    <>
      <RequestSectionNavBar
        activeSection={invitationActiveSection}
        switchSection={switchSection}
        handleNavigation={handleNavigation}
        handleActiveSection={handleActiveSection}
      />
      {!invitationActiveSection ? (
        <>
          <div className="p-4 sticky top-0 bg-white dark:bg-customGrey-black">
            <Input
              type="text"
              RightIcon={() =>
                searchQuery.isPending && (
                  <div>
                    <div className="api-loader w-[20px]"></div>
                  </div>
                )
              }
              onChange={handleSearch}
              iconClass="right-[15px]"
              classes="text-customGrey"
              placeholder="Search Friend here"
            />
          </div>
          <hr className="border dark:border-customGrey-blackBg" />
          {userList?.length ? (
            userList?.map((data: userItem, index: number) => (
              <UserItem
                {...data}
                refreshInvitations={refreshInvitations}
                key={index}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-white mt-4">
              No user found!
            </p>
          )}
        </>
      ) : invitationList?.length ? (
        invitationList?.map((data: requestItem, index: number) => (
          <RequestItem {...data} key={index} />
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-white mt-4">
          No invitations found!
        </p>
      )}
    </>
  );
};

export default RequestSection;
