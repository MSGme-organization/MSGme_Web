// import { Lucia } from "lucia";
// import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
// import prisma from "../prisma/prisma";

// const adapter = new PrismaAdapter(prisma.session, prisma.user);

// export const lucia = new Lucia(adapter, {
//   sessionCookie: {
//     attributes: {
//       secure: process.env.NODE_ENV === "production",
//     },
//   },
//   getSessionAttributes: (attributes) => {
//     console.log("lucia",attributes);
//     return {};
//   },
// });

// declare module "lucia" {
//   interface Register {
//     Lucia: typeof lucia;
//     DatabaseUserAttributes: DatabaseUserAttributes;
//   }
// }

// interface DatabaseUserAttributes {
//   username: string;
// }
