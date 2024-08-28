import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";

const lastChatData = [
  "Hey, are you coming to the meeting?",
  "Got the report. Thanks!",
  "Can you send me the latest designs?",
  "I'll be out of the office tomorrow.",
  "Lunch at 1 PM?",
  "Can we reschedule the call?",
  "Happy Birthday!",
  "See you at the game tonight.",
  "I'll send the documents by EOD.",
  "Let's catch up this weekend.",
  "Don't forget to review the PR.",
  "Great job on the presentation!",
  "Are you available for a quick call?",
  "Check your email for the details.",
  "Meeting postponed to tomorrow.",
  "Can you send me the updated file?",
  "Can you send me the updated file?",
  "Can you send me the updated file?",
];

const lastChatTime = [
  "2024-05-28T10:30:00Z",
  "2024-05-28T09:45:00Z",
  "2024-05-28T08:20:00Z",
  "2024-05-28T07:55:00Z",
  "2024-05-28T06:15:00Z",
  "2024-05-28T05:45:00Z",
  "2024-05-28T04:10:00Z",
  "2024-05-28T03:55:00Z",
  "2024-05-28T02:45:00Z",
  "2024-05-28T01:15:00Z",
  "2024-05-27T23:50:00Z",
  "2024-05-27T22:30:00Z",
  "2024-05-27T21:45:00Z",
  "2024-05-27T20:10:00Z",
  "2024-05-27T19:05:00Z",
  "2024-05-27T18:00:00Z",
];

export const GET = async () => {
  try {
    const decodedUser: any = decodedToken(
      cookies().get("token")?.value as string
    );
    const friendsList = await prisma.friend_List.findMany({
      where: {
        OR: [{ user_id: decodedUser?.id }, { friend_id: decodedUser?.id }],
      },
      include: { user: true, to_friend_list: true },
      orderBy: { created_at: "desc" },
    });
    const formattedFrdList = dataFormatter(friendsList, decodedUser.id);
    return response.success("", { friendsList: formattedFrdList });
  } catch (error: any) {
    return response.error(error?.message);
  }
};

const dataFormatter = (obj: any, loggedId: string): any => {
  const transformedData = obj.map((item: any) =>
    item.user.id !== loggedId
      ? {
          id: item.id,
          isBlocked: item.isBlocked,
          room_id: item.room_id,
          created_at: item.created_at,
          friendId: item.user.id,
          friend_username: item.user.username,
          friend_name: item.user.first_name + " " + item.user.last_name,
          friend_avatar: item.user.avatar,
          friend_email: item.user.email,
          friend_dob: item.user.dob,
          friend_bio: item.user.bio,
          lastChat:
            lastChatData[Math.floor(Math.random() * lastChatData.length)],
          lastChatTime:
            lastChatTime[Math.floor(Math.random() * lastChatTime.length)],
          newUnreadChatCount: Math.floor(Math.random() * 5),
        }
      : {
          id: item.id,
          isBlocked: item.isBlocked,
          room_id: item.room_id,
          created_at: item.created_at,
          friendId: item.to_friend_list.id,
          friend_username: item.to_friend_list.username,
          friend_name:
            item.to_friend_list.first_name +
            " " +
            item.to_friend_list.last_name,
          friend_avatar: item.to_friend_list.avatar,
          friend_email: item.to_friend_list.email,
          friend_dob: item.to_friend_list.dob,
          friend_bio: item.to_friend_list.bio,
          lastChat:
            lastChatData[Math.floor(Math.random() * lastChatData.length)],
          lastChatTime:
            lastChatTime[Math.floor(Math.random() * lastChatTime.length)],
          newUnreadChatCount: Math.floor(Math.random() * 5),
        }
  );
  return transformedData;
};
