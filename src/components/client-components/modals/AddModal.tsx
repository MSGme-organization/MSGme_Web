"use client";

import { searchUsers } from "@/query/search/searchUsers";
import { CloseIcon } from "@/utils/svgs";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import { CldImage } from "next-cloudinary";
import React from "react";
import Input from "../common-components/Input";

interface User {
  id: string;
  username: string;
  avatar: string;
}

interface AddModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const AddModal: React.FC<AddModalProps> = ({ showModal, setShowModal }) => {
  const [search, setSearch] = React.useState<string>("");
  const [filteredArr, setFilterenArr] = React.useState<User[]>([]);

  const searchQuery = useMutation({
    mutationFn: searchUsers,
    onSuccess: (res: any) => {
      setFilterenArr(res.data?.data?.users);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    searchQuery.mutate(e.target.value);
  };

  React.useEffect(() => {
    searchQuery.mutate(search);
  }, []);

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
            <h1 className="text-black dark:text-white text-lg font-semibold">
              Find someone for chat
            </h1>
            <button onClick={() => setShowModal(false)}> {CloseIcon()}</button>
          </div>
          <div className="mt-4">
            <Input
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
              onChange={handleSearch}
            />
          </div>
          {filteredArr.map((user, index) => (
            <div
              className="w-full py-4 flex justify-between items-center"
              key={index}
            >
              <div className="flex gap-5 items-center">
                <CldImage
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="rounded-full bg-green-300  aspect-square"
                />
                <p className="font-semibold">{user.username}</p>
              </div>
              <button className="bg-primary px-4 text-white font-bold rounded-full text-[15px]">
                +
              </button>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
