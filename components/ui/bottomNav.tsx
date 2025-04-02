import { Home, Inbox, Menu, Search } from "lucide-react";
import Link from "next/link";

const navItems = [
  { title: "Home", url: "#", icon: Home },
  { title: "Search", url: "#", icon: Search },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Settings", url: "#", icon: Menu },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-2 flex justify-around md:hidden">
      {navItems.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className="flex flex-col items-center text-gray-500 hover:text-black"
        >
          <item.icon size={24} />
          <span className="text-xs">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
