"use client"
import { CldImage } from "next-cloudinary";

const UserList = ({ filteredArr }) => {
    return (
        filteredArr && filteredArr.length !== 0 ? filteredArr.map((user: any) => (
            <div
                className="w-full py-4 flex justify-between items-center"
                key={user?.id}
            >
                <div className="flex gap-5 items-center">
                    <CldImage
                        src={user?.avatar || ""}
                        alt={`${user?.username}'s avatar`}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="rounded-full bg-green-300  aspect-square"
                    />
                    <p className="font-semibold">{user?.username}</p>
                </div>
                <button className="bg-primary px-4 text-white font-bold rounded-full text-[15px]">
                    +
                </button>
            </div>
        )) : (<div className="w-full py-4 flex justify-center items-center">No User Found</div>)
    )
}

export default UserList