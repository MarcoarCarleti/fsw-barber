import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";




const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
