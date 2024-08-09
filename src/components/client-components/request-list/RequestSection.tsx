import { searchUsers } from "@/query/search/searchUsers";
import { DEFAULT_PROFILE_IMG, invitations } from "@/utils/data";
import { CheckedIcon, WhiteCloseIcon } from "@/utils/svgs";
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
  bio: string;
  username: string;
}
interface requestItem {
  avatar: string | null;
  bio: string | null;
  username: string;
  status: string;
  isSentByMe: boolean;
}

const UserItem: React.FC<userItem> = ({ avatar, username, bio }) => (
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
    <button className="bg-primary px-4 text-white font-bold rounded-full text-[15px]">
      +
    </button>
  </div>
);

const RequestItem: React.FC<requestItem> = ({
  avatar,
  username,
  bio,
  status,
  isSentByMe,
}) => (
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
    {isSentByMe && status === "pending" ? (
      <div className="flex gap-4">
        <button className="bg-primary p-1 text-white font-bold rounded-full text-[12px] capitalize">
          {CheckedIcon()}
        </button>
        <button className="bg-primary p-1 text-white font-bold rounded-full text-[12px] capitalize">
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
    )}
  </div>
);

const RequestSection: React.FC<Props> = ({ handleActiveSection }) => {
  const [invitationActiveSection, setinvitationActiveSection] = React.useState<
    0 | 1
  >(0);
  const [filteredList, setFilteredList] = React.useState([]);
  const [invitationList, setInvitationList] = React.useState(invitations);
  const [searchString, setSearchString] = React.useState("");
  const router = useRouter();

  const searchQuery = useMutation({
    mutationFn: searchUsers,
    onSuccess: (res: any) => {
      setFilteredList(res.data?.data?.users);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const swichSection = React.useCallback((section: 0 | 1) => {
    setinvitationActiveSection(section);
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

  React.useEffect(() => {
    searchQuery.mutate(searchString);
  }, []);

  return (
    <>
      <RequestSectionNavBar
        activeSection={invitationActiveSection}
        swichSection={swichSection}
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
          {filteredList?.length ? (
            filteredList?.map((data: userItem, index: number) => (
              <UserItem {...data} key={index} />
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
          No user found!
        </p>
      )}
    </>
  );
};

export default React.memo(RequestSection);
