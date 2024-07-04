import { useAppSelector } from "@/redux/hooks";
import { EditIcon } from "@/utils/svgs";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

const ProfileSection = () => {
  const router = useRouter();
  const data = useAppSelector((state) => state.profile);

  return (
    <section className="w-full flex justify-between items-center p-4 h-[100px] text-black dark:text-white bg-white dark:bg-customGrey-black border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 w-[95%]">
        <CldImage
          width={60}
          height={60}
          src={data.avatar || "MSGme/default_profile"}
          alt="profile image"
          className="rounded-full aspect-square object-contain"
        />

        <p className="text-[20px] font-semibold">{data.username}</p>
      </div>
      <div className="w-[5%]">
        <button
          className="text-gray-400 dark:text-gray-50"
          onClick={() => router.push("/chat/settings/edit-profile")}
        >
          {EditIcon()}
        </button>
      </div>
    </section>
  );
};

export default ProfileSection;
