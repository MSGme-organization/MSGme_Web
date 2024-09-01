import { response } from "@/utils/helpers/response";
import { cookies } from "next/headers";

export const POST = async () => {
  try {
    cookies().delete("currentUser");
    cookies().delete("token");
    return response.success("logout successFull.", null)
  } catch (error: any) {
    return response.error(error.message)
  }
};
