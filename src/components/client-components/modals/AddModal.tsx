"use client";

import { searchUsers } from "@/query/add-user/friendsManage";
import { CloseIcon } from "@/utils/svgs";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import React from "react";
import Input from "../common-components/Input";
import UserList from "./UserList";

interface User {
  id: string;
  username: string;
  avatar: string | null;
}

interface AddModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const searchTypeString = {
  0: "all",
  1: "sent",
  2: "requests"
}

const AddModal: React.FC<AddModalProps> = ({ showModal, setShowModal }) => {
  const [search, setSearch] = React.useState<string>("");
  const [filteredArr, setFilteredArr] = React.useState<User[]>([]);
  const [modalType, setModalType] = React.useState<number>(0);
  const searchQuery = useMutation({
    mutationFn: searchUsers,
    onSuccess: (res: any) => {
      setFilteredArr(res.data?.data?.users);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const TypeHeader = [{
    title: "All",
    fn: () => handleModalTypeClick(0),
  },
  {
    title: "Sent",
    fn: () => handleModalTypeClick(1)
  }, {
    title: "Requests",
    fn: () => handleModalTypeClick(2)
  }
  ]

  const handleSearch = React.useCallback(() => {
    searchQuery.mutate({ search: search, searchType: searchTypeString[modalType] });
  }, [modalType, search]);

  const handleModalTypeClick = (type: number) => {
    setModalType(type)
  }

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [search])

  React.useEffect(() => {
    handleSearch()
  }, [modalType])

  return (
    <Modal
      position={"center"}
      show={showModal}
      onClose={() => setShowModal(false)}
      dismissible
    >
      <Modal.Body className="dark:bg-customGrey-black bg-gray-50 text-black dark:text-white ok">
        <div className="p-2">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-primary text-lg font-bold">
              Find friends for chat
            </h1>
            <button onClick={() => setShowModal(false)}> {CloseIcon()}</button>
          </div>
          <div className="flex justify-around items-center mt-1 mb-8">
            {
              TypeHeader.map((item, index) =>
                <h1 key={index} className={`flex-grow flex-1 text-center text-black  dark:text-textColor-dark rounded text-lg cursor-pointer py-2 ${index === modalType ? "shadow-sm bg-gray-200 dark:bg-customGrey-dark font-extrabold" : "font-semibold"}`} onClick={item.fn}>{item.title}</h1>
              )
            }
          </div>
          <div className="mt-4">
            <Input
              autocomplete="off"
              iconClass="right-[15px]"
              RightIcon={() =>
                searchQuery.isPending && (
                  <div>
                    <div className="api-loader w-[20px]"></div>
                  </div>
                )
              }
              classes=""
              name="search"
              placeholder="Search"
              type="text"
              required={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
              }
            />
          </div>
          {filteredArr && filteredArr.length !== 0 ? filteredArr.map((user: any) => (
            <UserList user={user} handleSearch={handleSearch} />
          )) : (<div className="w-full py-4 flex justify-center items-center">No User Found</div>)}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
