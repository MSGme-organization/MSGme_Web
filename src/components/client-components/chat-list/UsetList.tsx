import UserItem from "./UserItem";

interface Props {
  list: any[];
  activeChat: number | null;
  handleActiveChat: (chatID: number | null) => void;
}

const UsetList: React.FC<Props> = ({ list, activeChat, handleActiveChat }) => {
  return list.length ? (
    list?.map((data, index) => {
      return (
        <UserItem
          {...data}
          isActive={data.id === Number(activeChat)}
          handleActiveChat={handleActiveChat}
          key={index}
        />
      );
    })
  ) : (
    <p className="text-center text-gray-500 dark:text-white mt-4">
      No user found!
    </p>
  );
};

export default UsetList;
