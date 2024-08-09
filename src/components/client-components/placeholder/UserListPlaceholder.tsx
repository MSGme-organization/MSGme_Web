const UserListPlaceholder = () => {
  return (
    <div className="w-100 flex flex-col gap-1 px-3 pt-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="w-full h-[70px] rounded-md shimmer bg-gradient-to-l from-[#eeeeee] dark:from-gray-800 from-10% via-[#dddddd]  dark:via-gray-700 via-18% to-[#eeeeee] dark:to-gray-800 to-33%"
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default UserListPlaceholder;
