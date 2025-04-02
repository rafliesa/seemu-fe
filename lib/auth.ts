import { cookies } from "next/headers";

export const getAuthToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("jwt")?.value || "";
};