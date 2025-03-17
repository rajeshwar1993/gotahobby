"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Users, Compass, MessageSquare, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Friends",
    href: "/friends",
    icon: Users,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: Compass,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="container max-w-4xl mx-auto fixed bottom-0 left-0 right-0 border-t sm:border border-primary-100 dark:border-primary-900 bg-background/80 backdrop-blur-md pb-safe-area z-[1]">
      <nav className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex flex-col items-center gap-1 py-2 h-auto transition-colors",
                  isActive
                    ? "text-primary bg-primary-50 dark:bg-primary-900/30"
                    : "text-muted-foreground hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
