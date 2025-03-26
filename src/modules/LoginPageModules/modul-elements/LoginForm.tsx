"use client";

import { useForm } from "react-hook-form";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormSchema } from "../constant"
import { loginAction } from "../action"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const LoginForm = () => {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
        loginAction(values)
    }

    return (
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:justify-">
        <div className="w-1/2 bg-blue-300"></div>
        <div className="w-full md:w-1/2 flex min-h-screen justify-center items-center border-b-2 border-black">
          <div className="space-y-8 border-2 p-8 rounded-xl">
            <p className="flex font-bold text-2xl items-center justify-center">SeeMu</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-2">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-2 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <Button className="w-full" asChild={true}>
                    <a href="/register">Register</a>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
}