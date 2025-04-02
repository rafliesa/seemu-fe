"use server"
import { env } from "@/env.mjs"
import { getAuthToken } from "@/lib/auth"

export const postAction = async (content: string) => {
  const token = getAuthToken();
  console.log(token)

  try {
    const response = await fetch(env.AUTH_API_URL + "/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({ 
        community: "b367b3ac-f447-4bfd-b2cf-f9f5dc3c2d28",
        content
      }), 
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); 
    } else {
      console.error("An unknown error occurred");
    }
    throw new Error("Error while posting.");
  }
}
