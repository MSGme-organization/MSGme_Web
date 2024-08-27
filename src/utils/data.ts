export const DEFAULT_PROFILE_IMG = "MSGme/default_profile";

export const users = [
  {
    id: 1,
    name: "Alice Johnson",
    lastChat: "Hey, are you coming to the meeting?",
    lastChatTime: "2024-05-28T10:30:00Z",
    newUnreadChatCount: 3,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 2,

    name: "Bob Smith",
    lastChat: "Got the report. Thanks!",
    lastChatTime: "2024-05-28T09:45:00Z",
    newUnreadChatCount: 0,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    name: "Carol White",
    lastChat: "Can you send me the latest designs?",
    lastChatTime: "2024-05-28T08:20:00Z",
    newUnreadChatCount: 1,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 4,

    name: "David Brown",
    lastChat: "I'll be out of the office tomorrow.",
    lastChatTime: "2024-05-28T07:55:00Z",
    newUnreadChatCount: 2,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 5,

    name: "Eva Green",
    lastChat: "Lunch at 1 PM?",
    lastChatTime: "2024-05-28T06:15:00Z",
    newUnreadChatCount: 5,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 6,

    name: "Frank Harris",
    lastChat: "Can we reschedule the call?",
    lastChatTime: "2024-05-28T05:45:00Z",
    newUnreadChatCount: 4,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 7,

    name: "Grace Lee",
    lastChat: "Happy Birthday!",
    lastChatTime: "2024-05-28T04:10:00Z",
    newUnreadChatCount: 1,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 8,

    name: "Henry Martinez",
    lastChat: "See you at the game tonight.",
    lastChatTime: "2024-05-28T03:55:00Z",
    newUnreadChatCount: 2,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 9,

    name: "Ivy Nelson",
    lastChat: "I'll send the documents by EOD.",
    lastChatTime: "2024-05-28T02:45:00Z",
    newUnreadChatCount: 0,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 10,

    name: "Jack O'Connor",
    lastChat: "Let's catch up this weekend.",
    lastChatTime: "2024-05-28T01:15:00Z",
    newUnreadChatCount: 3,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 11,

    name: "Karen Patel",
    lastChat: "Don't forget to review the PR.",
    lastChatTime: "2024-05-27T23:50:00Z",
    newUnreadChatCount: 2,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 12,

    name: "Leo Quintero",
    lastChat: "Great job on the presentation!",
    lastChatTime: "2024-05-27T22:30:00Z",
    newUnreadChatCount: 1,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 13,

    name: "Mia Roberts",
    lastChat: "Are you available for a quick call?",
    lastChatTime: "2024-05-27T21:45:00Z",
    newUnreadChatCount: 0,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 14,

    name: "Nathan Scott",
    lastChat: "Check your email for the details.",
    lastChatTime: "2024-05-27T20:10:00Z",
    newUnreadChatCount: 4,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 15,

    name: "Olivia Turner",
    lastChat: "Meeting postponed to tomorrow.",
    lastChatTime: "2024-05-27T19:05:00Z",
    newUnreadChatCount: 5,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 16,

    name: "Paul Walker",
    lastChat: "Can you send me the updated file?",
    lastChatTime: "2024-05-27T18:00:00Z",
    newUnreadChatCount: 1,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 17,

    name: "Paul Walker",
    lastChat: "Can you send me the updated file?",
    lastChatTime: new Date().toString(),
    newUnreadChatCount: 1,
    avatarImage: "https://picsum.photos/200/300",
  },
  {
    id: 18,

    name: "Paul Walker",
    lastChat: "Can you send me the updated file?",
    lastChatTime: new Date().toString(),
    newUnreadChatCount: 1,
    avatarImage: "https://picsum.photos/200/300",
  },
];

export const messages = [
  {
    id: 1,
    username: "Alice Johnson",
    issentbyme: false,
    message:
      "Hey, are you coming to the meeting tomorrow? We need to discuss the project timeline and assign tasks to everyone.",
    avatar: "https://picsum.photos/200/300",
    reaction: "👍",
  },
  {
    id: 2,
    username: "Alice Johnson",
    issentbyme: false,
    message:
      "Hey, are you coming to the meeting tomorrow? We need to discuss the project timeline and assign tasks to everyone.",
    avatar: "https://picsum.photos/200/300",
    reaction: "👍",
  },
  {
    id: 3,
    username: "Me",
    issentbyme: true,
    message:
      "Yes, I'll be there. I'll prepare the project plan and bring it to the meeting for everyone to review.",
  },
  {
    id: 4,
    username: "Bob Smith",
    issentbyme: false,
    message:
      "Got the report. Thanks! The data looks promising, and I think we can use this to support our strategy for the next quarter.",
    avatar: "https://picsum.photos/200/300",
    reaction: "😄",
  },
  {
    id: 5,
    username: "Me",
    issentbyme: true,
    message:
      "No problem! Let me know if you need any more details or if there's anything else I can help with.",
  },
  {
    id: 6,
    username: "Carol White",
    issentbyme: false,
    message:
      "Can you send me the latest designs? I need to review them before our client presentation next week.",
    avatar: "https://picsum.photos/200/300",
    reaction: "😐",
  },
  {
    id: 7,
    username: "Me",
    issentbyme: true,
    message:
      "Sure, I'll send them over by end of day today. I'll make sure all the revisions are included as well.",
  },
  {
    id: 8,
    username: "David Brown",
    issentbyme: false,
    message:
      "I'll be out of the office tomorrow. If you need anything urgent, please contact Eva.",
    avatar: "https://picsum.photos/200/300",
    reaction: "👌",
  },
  {
    id: 9,
    username: "Me",
    issentbyme: true,
    message:
      "Okay, thanks for letting me know. I'll reach out to Eva if anything comes up.",
  },
  {
    id: 10,
    username: "Eva Green",
    issentbyme: false,
    message:
      "Lunch at 1 PM? There's a new restaurant downtown that I've been wanting to try.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 11,
    username: "Eva Green",
    issentbyme: false,
    message:
      "Lunch at 1 PM? There's a new restaurant downtown that I've been wanting to try.",
    avatar: "https://picsum.photos/200/300",
    repliedMsg: {
      id: 8,
      username: "David Brown",
      message:
        "I'll be out of the office tomorrow. If you need anything urgent, please contact Eva.",
      avatar: "https://picsum.photos/200/300",
    },
  },
  {
    id: 12,
    username: "Me",
    issentbyme: true,
    message:
      "Sounds good to me! I'll meet you at the office lobby at 12:45, and we can head over together.",
    reaction: "🍔",
  },
  {
    id: 13,
    username: "Frank Harris",
    issentbyme: false,
    message:
      "Can we reschedule the call? I have a conflict at the original time.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 14,
    username: "Frank Harris",
    issentbyme: false,
    message:
      "Can we reschedule the call? I have a conflict at the original time.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 15,
    username: "Me",
    issentbyme: true,
    message: "Sure, what time works for you? I'm flexible in the afternoon.",
  },
  {
    id: 16,
    username: "Grace Lee",
    issentbyme: false,
    message:
      "Happy Birthday! Hope you have a fantastic day filled with joy and celebration.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 17,
    username: "Me",
    issentbyme: true,
    message: "Thank you! I appreciate the kind words.",
  },
  {
    id: 18,
    username: "Henry Martinez",
    issentbyme: false,
    message: "See you at the game tonight. Let's cheer our team to victory!",
    avatar: "https://picsum.photos/200/300",
    reaction: "🏈",
  },
  {
    id: 19,
    username: "Me",
    issentbyme: true,
    message: "Looking forward to it! I'll be there with my team colors on.",
  },
  {
    id: 20,
    username: "Ivy Nelson",
    issentbyme: false,
    message:
      "I'll send the documents by EOD. Please review them and let me know if you have any feedback.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 21,
    username: "Me",
    issentbyme: true,
    message:
      "Thanks, Ivy. I'll review them as soon as I receive them and get back to you with my comments.",
    reaction: "📄",
  },
  {
    id: 22,
    username: "Jack O'Connor",
    issentbyme: false,
    message:
      "Let's catch up this weekend. It's been a while since we had a good chat.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 23,
    username: "Me",
    issentbyme: true,
    message:
      "Absolutely, let's do it. How about we meet for coffee on Saturday morning?",
    reaction: "☕",
  },
  {
    id: 24,
    username: "Karen Patel",
    issentbyme: false,
    message:
      "Don't forget to review the PR. We need your approval before we can move forward with the deployment.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 25,
    username: "Me",
    issentbyme: true,
    message:
      "Got it. I'll review the PR and provide my feedback by the end of the day.",
    reaction: "👀",
  },
  {
    id: 26,
    username: "Leo Quintero",
    issentbyme: false,
    message:
      "Great job on the presentation! The client was very impressed with the level of detail and the proposed solutions.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 27,
    username: "Me",
    issentbyme: true,
    message:
      "Thank you, Leo! It was a team effort. I'm glad the client found it valuable.",
  },
  {
    id: 28,
    username: "Mia Roberts",
    issentbyme: false,
    message:
      "Are you available for a quick call? I have a few questions about the project.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 29,
    username: "Me",
    issentbyme: true,
    message:
      "Sure, I can take a call in about 10 minutes. I'll give you a call then.",
  },
  {
    id: 30,
    username: "Nathan Scott",
    issentbyme: false,
    message:
      "Check your email for the details. I've sent over the updated project plan and timelines.",
    avatar: "https://picsum.photos/200/300",
  },
  {
    id: 31,
    username: "Me",
    issentbyme: true,
    message:
      "Thanks, Nathan. I'll review the updated plan and get back to you with any questions or comments.",
    reaction: "📧",
  },
  {
    id: 32,
    username: "Olivia Turner",
    issentbyme: false,
    message:
      "Meeting postponed to tomorrow. Please make sure to adjust your schedules accordingly.",
    avatar: "https://picsum.photos/200/300",
    repliedMsg: {
      id: 24,
      message:
        "Don't forget to review the PR. We need your approval before we can move forward with the deployment.",
      avatar: "https://picsum.photos/200/300",
      username: "Me",
    },
  },
];

export const invitations = [
  {
    id: "req1",
    sender: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: "Developer and tech enthusiast",
      username: "user123",
      id: "user1",
    },
    receiver: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: "Graphic designer and artist",
      username: "artist42",
      id: "user2",
    },
    status: "pending",
    isSentBySelf: true,
  },
  {
    id: "req2",
    sender: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: "Digital marketer",
      username: "marketer007",
      id: "user3",
    },
    receiver: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: "Photographer and traveler",
      username: "photoLover",
      id: "user4",
    },
    status: "accepted",
    isSentBySelf: false,
  },
  {
    id: "req3",
    sender: {
      avatar: null,
      bio: "Student and part-time coder",
      username: "codingStudent",
      id: "user5",
    },
    receiver: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: null,
      username: "teacherPro",
      id: "user6",
    },
    status: "rejected",
    isSentBySelf: true,
  },
  {
    id: "req3",
    sender: {
      avatar: null,
      bio: "Student and part-time coder",
      username: "codingStudent",
      id: "user5",
    },
    receiver: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: null,
      username: "teacherPro",
      id: "user6",
    },
    status: "rejected",
    isSentBySelf: true,
  },
  {
    id: "req3",
    sender: {
      avatar: null,
      bio: "Student and part-time coder",
      username: "codingStudent",
      id: "user5",
    },
    receiver: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: null,
      username: "teacherPro",
      id: "user6",
    },
    status: "rejected",
    isSentBySelf: true,
  },
  {
    id: "req3",
    sender: {
      avatar: null,
      bio: "Student and part-time coder",
      username: "codingStudent",
      id: "user5",
    },
    receiver: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: null,
      username: "teacherPro",
      id: "user6",
    },
    status: "rejected",
    isSentBySelf: true,
  },
  {
    id: "req3",
    sender: {
      avatar: null,
      bio: "Student and part-time coder",
      username: "codingStudent",
      id: "user5",
    },
    receiver: {
      avatar: DEFAULT_PROFILE_IMG,
      bio: null,
      username: "teacherPro",
      id: "user6",
    },
    status: "pending",
    isSentBySelf: false,
  },
];
