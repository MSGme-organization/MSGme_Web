import { deleteCloudinary, uploadCloudinary } from "@/api-modules/helpers/cloudinary";
import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { userNameFetch } from "@/utils/user_fetch";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateReq = async (body: any) => {
  const emailExist: any = await userNameFetch(body.email);
  const decodedUser: any = decodedToken(cookies().get("token")?.value);
  const nameExist: any = await userNameFetch(body.username);
  const user: any = await prisma.user.findFirst({ where: { id: decodedUser.id } })
  if (body.step) {
    if (body.step === 1) {
      if (body.last_name && body.first_name) {
        const userData = { last_name: body.last_name, first_name: body.first_name };
        return userData;
      } else {
        return response.dataInvalid("data is required.");
      }
    } else if (body.step === 2) {
      if (body.dob) {
        const userData = {
          dob: new Date(body.dob).toISOString(),
        };
        return userData;
      } else {
        return response.dataInvalid("date of birth is required.");
      }
    } else if (body.step === 3) {
      if (body?.avatar) {
        if (user.avatar !== null) {
          await deleteCloudinary(user.avatar)
        }
        const { public_id } = await uploadCloudinary(body.avatar);
        const userData = { avatar: public_id };
        return userData;
      } else {
        return response.dataInvalid("profile photo is required.");
      }
    } else {
      return response.dataInvalid("step is invalid.");
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
        return response.dataInvalid("email is not valid.");
      }

      if (nameExist && decodedUser.id !== nameExist.id) {
        return response.dataConflict("username already taken.")
      }

      if (emailExist && decodedUser.id !== emailExist.id) {
        return response.dataConflict("email already taken.")

      }
      let { step = null, ...userData } = {
        ...body,
        dob: new Date(body.dob).toISOString(),
      };

      if (body?.avatar) {
        if (user.avatar !== null) {
          await deleteCloudinary(user.avatar)
        }
        const { public_id } = await uploadCloudinary(body.avatar);
        userData = { ...userData, avatar: public_id };
      }

      return userData;
    } else {
      return response.dataInvalid("Invalid credentials.")
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
    return response.success("user data updated successfully.", user)
  } catch (error: any) {
    return response.error(error.message)
  }
};
