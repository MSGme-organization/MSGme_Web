"use client";
import { friendRequest, friendRequestResponse } from "@/query/add-user/friendsManage";
import { fetchChatListData } from "@/lib/redux/chat-list/chatListSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { DEFAULT_PROFILE_IMG } from "@/utils/data";
import { CheckSvg, CrossSvg, SandWatch } from "@/utils/svgs";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { CldImage } from "next-cloudinary";
import React from "react";

interface UserListPropsInterface {
    user: {
        id: string;
        avatar?: string | null;
        username: string;
        userStatus: string | null;
        bio?: string | null;
    };
    handleSearch: () => void
}

const userStatusButton = {
    "sent": (handleUserStatus: (status: string) => void) => (
        <button
            onClick={() => handleUserStatus("unSent")}
            className="bg-yellow-400 px-2 text-white font-bold rounded-full text-[15px] max-w-[38px] w-full h-[22px]"
        >{SandWatch()}</button>
    ),
    "request": (handleUserStatus: (status: string) => void) => (
        <div className="flex items-center gap-2">
            <button
                onClick={() => handleUserStatus("accept")}
                className="bg-primary px-2 text-white font-bold rounded-full text-[15px] min-w-[38px] h-[22px]"
            >{CheckSvg()}</button>
            <button
                onClick={() => handleUserStatus("reject")}
                className="bg-warning px-2 text-white font-bold rounded-full text-[15px] min-w-[38px] h-[22px]"
            >{CrossSvg()}</button>
        </div>
    ),
};

const UserList = ({ user, handleSearch }: UserListPropsInterface) => {
    const [userStatus, setUserStatus] = React.useState<string | null>(
        null
    );
    const dispatch = useAppDispatch()

    const frdRequestQuery = useMutation({
        mutationFn: friendRequest,
        onSuccess: (res: AxiosResponse) => {
            successToast(res.data?.message);
            setUserStatus(res.data?.data?.requestStatus === "unSent" ? null : "sent")
        },
        onError: (error: AxiosError) => {
            errorToast(error.message);
        },
    });


    const requestResponseQuery = useMutation({
        mutationFn: friendRequestResponse,
        onSuccess: (res: AxiosResponse) => {
            successToast(res.data?.message);
            dispatch(fetchChatListData())
            handleSearch()
        },
        onError: (error: AxiosError) => {
            errorToast(error.message);
        },
    })


    const handleUserStatus = async (status: string) => {
        if (status === "sent" || status === "unSent") {
            frdRequestQuery.mutate({ receiverId: user.id, requestStatus: status })
        } else {
            if (status === "accept") {
                requestResponseQuery.mutate({ receiverId: user.id, requestResponse: "1" })
            } else {
                requestResponseQuery.mutate({ receiverId: user.id, requestResponse: "0" })
            }
        }
    };

    React.useEffect(() => {
        setUserStatus(user.userStatus)
    }, [user.userStatus])

    return (
        <div
            className="w-full py-4 flex justify-between items-center"
            key={user?.id}
        >
            <div className="flex gap-5 items-center">
                <CldImage
                    src={user?.avatar || DEFAULT_PROFILE_IMG}
                    alt={`${user?.username}'s avatar`}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="rounded-full bg-green-300  aspect-square"
                />
                <p className="font-semibold">{user?.username}</p>
            </div>

            {requestResponseQuery.isPending || frdRequestQuery.isPending ?
                (
                    <div>
                        <div className="api-loader w-[20px]"></div>
                    </div>
                ) : userStatus ?
                    (
                        userStatusButton[userStatus](handleUserStatus)
                    ) : (
                        <button
                            onClick={() => handleUserStatus("sent")}
                            className="bg-primary px-4 text-white font-bold rounded-full text-[15px]"
                        >
                            +
                        </button>
                    )}
        </div>
    );
};

export default React.memo(UserList);
