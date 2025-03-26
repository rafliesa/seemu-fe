"use server"

import { z } from "zod"
import { loginFormSchema } from "./constant"
import { cookies } from "next/headers"
import { LoginResponse } from "./interface"
import { env } from "@/env.mjs";

export const loginAction = async (values: z.infer<typeof loginFormSchema>) => {
  try {
    const cookieStore = await cookies()
    const response = await fetch(env.AUTH_API_URL + "/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Something went wrong.")
    }

    const data = (await response.json()) as LoginResponse

    if (!data.access || !data.refresh) {
      throw new Error("Something went wrong.")
    }

    cookieStore.set("osaka-access", data.access)
    cookieStore.set("osaka-refresh", data.refresh)
  } catch (error) {
    console.log(error)
  }
}
