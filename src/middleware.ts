import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "./api-modules/middlewares/authorize";

const publicRoutes = ["/", "/login", "/register", "/reset-password"];

const protectedApiRoutes = [
  "/api/v1/edit-profile",
  "/api/v1/get-profile",
  "/api/v1/change-password",
  "/api/v1/logout",
  "/api/v1/get-friends",
];

export default async function middleware(req: NextRequest) {
  try {
    if (req.nextUrl.pathname.startsWith("/api")) {
      const isprotectedRoute = protectedApiRoutes.includes(
        req.nextUrl.pathname
      );
      
      if (isprotectedRoute) {
        await authorize(req);
        return NextResponse.next();
      } else {
        return NextResponse.next();
      }
    } else {
      if (
        req.nextUrl.pathname.includes("/otp") &&
        cookies().get("otp_verify")?.value
      ) {
        return NextResponse.next();
      } else if (
        req.nextUrl.pathname.includes("/set-password") &&
        cookies().get("set-pass")?.value
      ) {
        return NextResponse.next();
      } else {
        const ispublicRoute = publicRoutes.includes(req.nextUrl.pathname);
        if (ispublicRoute && cookies().get("token")?.value) {
          return NextResponse.redirect(new URL("/chat", req.url));
        } else if (!ispublicRoute && !cookies().get("token")?.value) {
          return NextResponse.redirect(new URL("/login", req.url));
        } else if (!ispublicRoute && cookies().get("token")?.value) {
          const user = JSON.parse(
            cookies().get("currentUser")?.value as string
          );
          if (
            req.nextUrl.pathname.startsWith("/profile-details") &&
            user.first_name &&
            user.first_name &&
            user.dob
          ) {
            return NextResponse.redirect(new URL("chat", req.url));
          } else if (req.nextUrl.pathname.startsWith("/profile-details")) {
            return NextResponse.next();
          }
          if (!user.first_name || !user.first_name || !user.dob) {
            return NextResponse.redirect(new URL("profile-details", req.url));
          } else {
            return NextResponse.next();
          }
        } else {
          return NextResponse.next();
        }
      }
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err.message });
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/set-password",
    "/reset-password",
    "/profile-details",
    "/chat",
    "/chat/:path*",
    "/",
    "/api",
    "/api/:path*",
    "/otp",
    "/set-password",
  ],
};
