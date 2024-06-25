import prisma from "@/lib/prisma/prisma";

export const userNameFetch = async (userName: string | undefined) => {
  try {
    if (userName) {
      return await prisma.user.findFirst({
        where: {
          username: userName,
        },
      });
    } else {
      throw new Error("User Name not provide");
    }
  } catch (error) {
    return error;
  }
};

export const emailFetch = async (email: string | undefined) => {
  try {
    if (email) {
      return await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
    } else {
      throw new Error("User Name not provide");
    }
  } catch (error) {
    return error;
  }
};
