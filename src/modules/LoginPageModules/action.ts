"use server"

import { z } from "zod"
import { loginFormSchema } from "./constant"
import { cookies } from "next/headers"
import { LoginResponse } from "./interface"
import { env } from "@/env.mjs";
import { redirect } from "next/navigation"

export const loginAction = async (values: z.infer<typeof loginFormSchema>) => {
  console.log("TEST");
  try {
    const cookieStore = await cookies()
    const response = await fetch(env.AUTH_API_URL + "/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    })

    if (!response.ok) {
      return { success: false, error: "Something went wrong" };
    }

    const data = (await response.json()) as LoginResponse

    if (!data.jwt) {
      return { success: false, error: "Authentication failed" };
    }

    cookieStore.set("jwt", data.jwt)
    return { success: true }
    
  } catch (error) {
    console.log(error)
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
