"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../constant";
import { loginAction } from "../action";
import { useRouter } from "next/navigation"; // Tambahkan ini untuk redirect
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react"; // Tambahkan ini untuk menampilkan error

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // State untuk error handling

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setError(null);

    const result = await loginAction(values);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error ?? "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between md:justify-center">
      <div className="w-1/2 bg-black flex justify-center items-center text-white text-8xl">SeeMu</div>
      <div className="w-full md:w-1/2 flex min-h-screen justify-center items-center border-b-2 border-black">
        <div className="space-y-8 border-2 p-8 rounded-xl">
          <p className="flex font-bold text-2xl items-center justify-center">Login</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-red-500 text-center">{error}</p>} 

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
};
