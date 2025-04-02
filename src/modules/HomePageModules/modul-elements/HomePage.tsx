"use client"
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BottomNav } from "@/components/ui/bottomNav";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex md:grid grid-cols-[auto_1fr] min-h-screen">
      <SidebarProvider className="hidden md:block">
        <AppSidebar />
      </SidebarProvider>

      <div className="flex w-full">
        <div className="w-full md:w-2/3 flex justify-center m-2">
          <div className="w-full overflow-y-auto">
            <PostForm />
            {[...Array(5)].map((_, i) => (
              <PostCard
                title="Rafli Esa"
                community="Genshin Impact Indonesia"
                description="@jaWirz213"
                key={i}
                content={"Some content"}
              />
            ))}
          </div>
        </div>

        <div className="w-1/3 border-l p-4 sticky top-0 h-screen hidden md:block">
          <div className="text-gray-700 font-semibold flex flex-col h-full">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Cari komunitas..."
                className="w-full p-2 border rounded-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <hr />
            </div>
            <p className="flex justify-center">Komunitas Populer</p>
            <Card>
              <CardHeader>
                <CardTitle>Komunitas Genshin Impact</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
