// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim();
        const password = credentials?.password;

        if (!username || !password) return null;

        const admin = await prisma.adminUser.findUnique({
          where: { username },
        });

        if (!admin || !admin.isActive) return null;

        const ok = await compare(password, admin.passwordHash);
        if (!ok) return null;

       
        return {
          id: admin.id,
          name: "Admin Carter",
          username: admin.username,
          role: String(admin.role || "").toLowerCase(),
        } as any;
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },

  callbacks: {
    async jwt({ token, user }) {
     
      if (user) {
        (token as any).role = String((user as any).role || "").toLowerCase();
        (token as any).username = String((user as any).username || "");
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = String((token as any).role || "").toLowerCase();
        (session.user as any).username = String((token as any).username || "");
      }
      return session;
    },
  },
};
