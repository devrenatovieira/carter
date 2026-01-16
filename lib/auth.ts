// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // <- ESSENCIAL no deploy

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

        // Retorne role + username aqui
        return {
          id: admin.id,
          name: "Admin Carter",
          username: admin.username,
          role: admin.role, // "admin"
        } as any;
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).username = token.username;
      }
      return session;
    },
  },
};
