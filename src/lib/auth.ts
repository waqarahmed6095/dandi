import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/authOptions";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // You can throw or redirect
    throw new Error("Not authenticated");
  }
  return session;
}
