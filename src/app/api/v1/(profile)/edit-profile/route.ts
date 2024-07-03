import { uploadCloudinary } from "@/api-modules/helpers/cloudinary";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { emailFetch, userNameFetch } from "@/utils/user_fetch";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const validateReq = async (body: any) => {
  if (body.step) {
    if (body.step === 1) {
      if (body.last_name && body.first_name) {
        const { step, ...userData } = body;
        console.log(userData, body);
        return userData;
      } else {
        throw new Error("data is required.");
      }
    } else if (body.step === 2) {
      if (body.dob) {
        const { step = null, ...userData } = {
          ...body,
          dob: new Date(body.dob).toISOString(),
        };
        return userData;
      } else {
        throw new Error("date of birth is required.");
      }
    } else if (body.step === 3) {
      if (body.avatar) {
        const avatar = await uploadCloudinary(body.avatar);
        const { step = null, ...userData } = { avatar };
        return userData;
      } else {
        throw new Error("profile photo is required.");
      }
    } else {
      throw new Error("step is invalid.");
    }
  } else {
    if (
      body.last_name &&
      body.first_name &&
      body.username &&
      body.email &&
      body.dob
    ) {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
        throw new Error("email is not valid");
      }

      const nameExist = await userNameFetch(body.username);
      const emailExist = await userNameFetch(body.email);
      const decodedUser = decodedToken(cookies().get("token")?.value);

      if (nameExist && decodedUser.id !== nameExist.id) {
        throw new Error("username already taken.");
      }

      if (emailExist && decodedUser.id !== emailExist.id) {
        throw new Error("email already taken.");
      }

      const { step = null, ...userData } = {
        ...body,
        dob: new Date(body.dob).toISOString(),
      };

      return userData;
    } else {
      throw new Error("data is invalid.");
    }
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const updatedUser = await validateReq(body);
    const decodedUser = decodedToken(cookies().get("token")?.value);

    const user = await prisma.user.update({
      where: { id: decodedUser.id },
      data: updatedUser,
    });

    cookies().set("currentUser", JSON.stringify(user));

    return NextResponse.json(
      {
        message: "user data updated successfully.",
        data: user,
      },
      { status: 200, statusText: "signed up successfully." }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        data: null,
      },
      { status: 500, statusText: error.message }
    );
  }
};
