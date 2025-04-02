"use server"
import { z } from "zod"
import { registrationFormSchema } from "./constant"
import { env } from "@/env.mjs"
import { redirect } from "next/navigation"

export const registerAction = async (values: z.infer<typeof registrationFormSchema>) => {
    try {
      const { password1, ...filteredValues } = values
      const modifiedValues = { ...filteredValues, password: password1 } 
  
      const response = await fetch(env.AUTH_API_URL + "/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedValues), 
        credentials: "include",
      })
  
      if (!response.ok) {
        throw new Error("Something went wrong.")
      }
      
      redirect("/login")
    } catch (error) {
      console.log(error)
    }
  }

