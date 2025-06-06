import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../../app/dashboard/lib/supabaseClient";

// Define your auth options
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async signIn({ user }: { user: { email?: string; name?: string; image?: string } }) {
      // Check if user already exists in Supabase
      const { data } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!data) {
        // Insert new user
        const { error: insertError } = await supabase.from("users").insert([
          {
            email: user.email,
            name: user.name,
            image: user.image,
            // add other fields as needed
          },
        ]);
        if (insertError) {
          console.error("Error inserting user:", insertError);
          // Optionally, return false to block sign-in
        }
      }
      return true; // Allow sign-in
    },
  },
  // ...any other NextAuth options (callbacks, etc)
};

// Pass authOptions to NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
