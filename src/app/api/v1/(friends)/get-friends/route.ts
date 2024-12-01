import { response } from "@/utils/helpers/response";
import { decodedToken } from "@/utils/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const decodedUser: any = decodedToken(
      cookies().get("token")?.value as string
    );

    const chatListData = await prisma.room.findMany({
      where: {
        OR: [
          {
            friendList: {
              OR: [{ userId: decodedUser?.id }, { friendId: decodedUser?.id }],
            },
          },
          {
            group: {
              groupList: {
                some: {
                  AND: [{ userId: decodedUser?.id }, { isBlocked: false }],
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        members: true,
        lastMessage: true,
        createdAt: true,
        lastMsgTimestamp: true,
        isGroup: true,
        friendList: {
          select: {
            id: true,
            userId: true,
            friendId: true,
            isBlocked: true,
            user: {
              select: {
                username: true,
                firstName: true,
                lastName: true,
                avatar: true,
                bio: true,
              },
            },
            toFriend: {
              select: {
                username: true,
                firstName: true,
                lastName: true,
                avatar: true,
                bio: true,
              },
            },
          },
        },
        group: {
          select: {
            groupName: true,
            groupImage: true,
            id: true,
            groupList: {
              select: {
                isBlocked: true,
                user: {
                  select: {
                    username: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                    bio: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        lastMsgTimestamp: "desc",
      },
    });
    const formattedChatList = dataFormatter(chatListData, decodedUser.id);

    return response.success("", { chatList: formattedChatList });
  } catch (error: any) {
    return response.error(error?.message);
  }
};

const dataFormatter = (chatListData: any, loggedId: string): any => {
  const transformedData = chatListData.map((chatObj: any) => {
    if (chatObj.isGroup) {
      return {
        roomId: chatObj?.id || "",
        id: chatObj.group.id || "",
        isBlocked: chatObj?.group?.groupList?.isBlocked,
        createdAt: chatObj?.createdAt || "",
        chatName: chatObj?.group?.groupName || "",
        chatAvatar: chatObj?.group?.groupImage || "",
        chatBio: "",
        lastChat: chatObj?.lastMessage || "",
        lastChatTime: chatObj?.lastMsgTimestamp || "",
        newUnreadChatCount: 0,
      };
    } else {
      return chatObj.friendList.userId !== loggedId
        ? {
            id: chatObj?.friendList?.id || "",
            isBlocked: chatObj?.friendList?.isBlocked,
            roomId: chatObj?.id || "",
            createdAt: chatObj?.createdAt || "",
            chatName:
              chatObj?.friendList?.user?.firstName +
              " " +
              chatObj?.friendList?.user?.lastName,
            chatAvatar: chatObj?.friendList?.user?.avatar || "",
            chatBio: chatObj?.friendList?.user?.bio || "",
            lastChat: chatObj?.lastMessage || "",
            lastChatTime: chatObj?.lastMsgTimestamp || "",
            newUnreadChatCount: 0,
          }
        : {
            id: chatObj?.friendList?.id || "",
            isBlocked: chatObj?.friendList?.isBlocked,
            roomId: chatObj?.id || "",
            createdAt: chatObj?.createdAt || "",
            chatName:
              chatObj?.friendList?.toFriend?.firstName +
              " " +
              chatObj?.friendList?.toFriend?.lastName,
            chatAvatar: chatObj?.friendList?.toFriend?.avatar || "",
            chatBio: chatObj?.friendList?.toFriend?.bio || "",
            lastChat: chatObj?.lastMessage || "",
            lastChatTime: chatObj?.lastMsgTimestamp || "",
            newUnreadChatCount: 0,
          };
    }
  });
  return transformedData;
};
