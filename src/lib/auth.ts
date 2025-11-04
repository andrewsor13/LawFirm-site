import CredentialsProvider from "next-auth/providers/credentials";
import { supabaseAdmin } from "./supabaseAdmin";
import { NextAuthOptions, DefaultSession } from "next-auth";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        console.log("🔑 Login attempt:", { email, password });

        const { data, error } = await supabaseAdmin
          .from("admin_users")
          .select("*")
          .eq("email", email)
          .single();

        console.log("🗂 Supabase result:", { data, error });

        if (error || !data) {
          console.log("❌ User not found in DB");
          return null;
        }

        const isValid = await compare(password, data.password);
        console.log("🔐 Compare result:", isValid);

        if (!isValid) {
          console.log("❌ Invalid password for user:", data.email);
          return null;
        }

        console.log("✅ Authorized user:", data.email);
        return {
          id: data.id,
          email: data.email,
          role: data.role,
          name: data.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
