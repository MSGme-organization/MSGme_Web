"use client";

import { users } from "@/utils/data";
import { Modal } from "flowbite-react";
import Image from "next/image";
import React from "react";
import Input from "../common-components/Input";
import { CloseIcon } from "@/utils/svgs";

interface AddModalProps {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

const AddModal: React.FC<AddModalProps> = ({
    showModal, setShowModal
}) => {
    const [search, setSearch] = React.useState<string>("");
    const [filteredArr, setFilterenArr] = React.useState(users);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setFilterenArr(
            users.filter((user) =>
                user.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <Modal
            position={"center"}
            show={showModal}
            onClose={() => setShowModal(false)}
            dismissible
        >
            <Modal.Body className="dark:bg-customGrey-blackBg bg-gray-50 text-black dark:text-white">
                <div className="p-2">
                    <div></div> <div className="w-full flex justify-between items-center">
                        <h1 className="text-black dark:text-white text-lg font-semibold">
                            Find someone for chat
                        </h1>
                        <button onClick={() => setShowModal(false)}> {CloseIcon()}</button>

                    </div>
                    <div className="mt-4">
                        <Input classes=""
                            name="search"
                            placeholder="Search"
                            type="text"
                            required={false}
                            onChange={handleSearch}
                        />
                    </div>
                    {filteredArr
                        .slice(0, filteredArr.length < 5 ? filteredArr.length : 5)
                        .map((user, index) => (
                            <div
                                className="w-full py-4 flex justify-between items-center"
                                key={index}
                            >
                                <div className="flex gap-5 items-center">
                                    <Image
                                        src={user.avatarImage}
                                        alt={`${user.name}'s avatar`}
                                        width={40}
                                        height={40}
                                        className="rounded-full bg-green-300  aspect-square"
                                    />
                                    <p className="font-semibold">{user.name}</p>
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
