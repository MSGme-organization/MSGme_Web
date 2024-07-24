import {
  deleteCloudinaryImage,
  uploadCloudinaryImage,
} from "@/api-modules/helpers/cloudinary";
import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { emailFetch, userNameFetch } from "@/utils/user_fetch";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const validateReq = async (body: FormData) => {
  const emailExist: any =
    body.get("email") && (await emailFetch(body.get("email") as string));
  const decodedUser: any = decodedToken(cookies().get("token")?.value);
  const nameExist: any =
    body.get("username") &&
    (await userNameFetch(body.get("username")?.toString()));
  const user: any = await prisma.user.findFirst({
    where: { id: decodedUser.id },
  });
  const step = Number(body.get("step"));
  const last_name = body.get("last_name")?.toString();
  const first_name = body.get("first_name")?.toString();
  const dob = body.get("dob")?.toString();
  const avatar = body.get("avatar");
  const username = body.get("username")?.toString();
  const email = body.get("email")?.toString();
  const bio = body.get("bio")?.toString();

  if (step) {
    if (step === 1) {
      if (last_name && first_name) {
        const userData = {
          last_name: last_name,
          first_name: first_name,
        };
        return userData;
      } else {
        const errors = {};
        if (!last_name) {
          errors["last_name"] = "last name is required.";
        }
        if (!first_name) {
          errors["first_name"] = "first name is required.";
        }

        return response.dataInvalid("data is required.", {
          ...errors,
        });
      }
    } else if (step === 2) {
      if (dob) {
        const userData = {
          dob: new Date(dob).toISOString(),
        };
        return userData;
      } else {
        return response.dataInvalid("date of birth is required.", {
          dob: "date of birth is required.",
        });
      }
    } else if (step === 3) {
      if (avatar) {
        if (user.avatar !== null) {
          await deleteCloudinaryImage(user.avatar);
        }
        const { public_id } = await uploadCloudinaryImage(avatar as File);
        const userData = { avatar: public_id };
        return userData;
      } else {
        return response.dataInvalid("profile photo is required.", {
          avatar: "profile photo is required.",
        });
      }
    } else {
      return response.dataInvalid("step is invalid.");
    }
  } else {
    const userData = {};
    last_name && (userData["last_name"] = last_name);
    first_name && (userData["first_name"] = first_name);
    dob && (userData["dob"] = dob);
    bio && (userData["bio"] = bio);

    if (avatar) {
      if (user.avatar !== null) {
        await deleteCloudinaryImage(user.avatar);
      }
      const { public_id } = await uploadCloudinaryImage(avatar as File);
      userData["avatar"] = public_id;
    }

    if (username) {
      if (nameExist && decodedUser.id !== nameExist.id) {
        return response.dataConflict("username already taken.", {
          username: "username already taken.",
        });
      } else {
        userData["username"] = username;
      }
    }

    if (email) {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return response.dataInvalid("email is not valid.", {
          email: "email is not valid.",
        });
      } else if (emailExist && decodedUser.id !== emailExist.id) {
        return response.dataConflict("email already taken.", {
          email: "email already taken.",
        });
      } else {
        userData["email"] = email;
      }
    }

    return userData;
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.formData();

    const updatedUser = await validateReq(body);
    console.log(updatedUser);
    if (updatedUser instanceof NextResponse) {
      return updatedUser;
    }
    const decodedUser = decodedToken(cookies().get("token")?.value);

    const user = await prisma.user.update({
      where: { id: decodedUser.id },
      data: updatedUser,
    });

    cookies().set("currentUser", JSON.stringify(user));
    return response.success("user data updated successfully.", {});
  } catch (error: any) {
    return response.error(error.message);
  }
};
