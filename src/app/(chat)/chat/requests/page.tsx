"use client";

import Input from "@/components/client-components/common-components/Input";
import RequestNavbar from "@/components/client-components/requests/RequestNavbar";
import { searchUsers } from "@/query/search/searchUsers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateInvitations,
  updateReqUsers,
} from "@/redux/requests/requestSlice";
import { DEFAULT_PROFILE_IMG, invitations } from "@/utils/data";
import { CheckedIcon, DiagonallyArrowIcon, WhiteCloseIcon } from "@/utils/svgs";
import { useMutation } from "@tanstack/react-query";
import { CldImage } from "next-cloudinary";
import React from "react";

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
    const [sendReqQuery, setSendReqQuery] = React.useState<boolean>(false);

    const handleLoading = () => {
      setSendReqQuery(true);
      setTimeout(() => {
        setSendReqQuery(false);
      }, 2000);
    };

    // const sendReqQuery = useMutation({
    //   mutationFn: sendRequest,
    //   onSuccess: (res: any) => {
    //     refreshInvitations();
    //   },
    //   onError: (error: any) => {
    //     console.error(error);
    //   },
    // });

    // const sendReq = () => {
    //   sendReqQuery.mutate({ id });
    // };

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
        {/* {!sendReqQuery.isPending ? ( */}
        {!sendReqQuery ? (
          <button
            className="bg-primary px-4 text-white font-bold rounded-full text-[15px]"
            // onClick={sendReq}
            onClick={handleLoading}
          >
            +
          </button>
        ) : (
          <div className="w-4 mx-4">
            <div className="api-loader w-full"></div>
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
    const [updateReqStatusQuery, setUpdateReqStatusQuery] =
      React.useState<boolean>(false);

    const handleLoading = () => {
      setUpdateReqStatusQuery(true);
      setTimeout(() => {
        setUpdateReqStatusQuery(false);
      }, 2000);
    };

    // const updateReqStatusQuery = useMutation({
    //   mutationFn: updateReqStatus,
    //   onSuccess: (res: any) => {
    //     dispatch(updateInvitationStatus(res.data.data.status, id));
    //   },
    //   onError: (error: any) => {
    //     console.error(error);
    //   },
    // });

    // const handleAccept = () => updateReqStatusQuery.mutate({ id, status: 1 });
    // const handleReject = () => updateReqStatusQuery.mutate({ id, status: 2 });

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
        {/* {!updateReqStatusQuery.isPending ? ( */}
        {!updateReqStatusQuery ? (
          !isSentBySelf && status === "pending" ? (
            <div className="flex gap-4">
              <button
                className="bg-primary p-1 text-white font-bold rounded-full text-[12px] capitalize"
                // onClick={handleAccept}
                onClick={handleLoading}
              >
                {CheckedIcon()}
              </button>
              <button
                className="p-1 text-white font-bold rounded-full text-[12px] capitalize bg-red-500"
                onClick={handleLoading}
                // onClick={handleReject}
              >
                {WhiteCloseIcon()}
              </button>
            </div>
          ) : (
            <div
              className={`w-[11ch] ${
                status === "rejected" ? "bg-red-500" : "bg-primary"
              } px-4 text-white font-medium rounded-full text-[12px] capitalize`}
            >
              {status}
            </div>
          )
        ) : (
          <div className=" w-4 mx-1">
            <div className="api-loader  w-full"></div>
          </div>
        )}
      </div>
    );
  }
);

const Requests = () => {
  const dispatch = useAppDispatch();
  const [activeSection, setActiveSection] = React.useState<0 | 1>(0);
  const { usersList, invitationList } = useAppSelector((state) => ({
    usersList: state.request.searchData,
    invitationList: state.request.invitations,
  }));

  const searchQuery = useMutation({
    mutationFn: searchUsers,
    onSuccess: (res: any) => {
      console.log(res);
      dispatch(updateReqUsers(res.data?.data?.users));
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  // const getInvitationsQuery = useMutation({
  //   mutationFn: getInvitations,
  //   onSuccess: (res: any) => {
  //     dispatch(updateInvitations(res.data?.data?.invitations));
  //   },
  //   onError: (error: any) => {
  //     console.error(error);
  //   },
  // });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchQuery.mutate(e.target.value);
  };

  const refreshInvitations = () => {
    // getInvitationsQuery.mutate();
  };

  React.useEffect(() => {
    activeSection
      ? dispatch(updateInvitations(invitations))
      : searchQuery.mutate("");
  }, [activeSection]);

  return (
    <>
      <RequestNavbar
        handleActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      {!activeSection ? (
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
          {usersList?.length ? (
            usersList?.map((data: userItem, index: number) => (
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

export default Requests;
