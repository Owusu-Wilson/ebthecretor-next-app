import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn("flex gap-6", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center font-medium">
            Home
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem asChild>
            <Link href="/">Main Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Creative Agency</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Personal Portfolio</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Portfolio Masonry</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center font-medium">
            Pages
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem asChild>
            <Link href="/about-us">About Us</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Our Team</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">About Me</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Contact Us</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center font-medium">
            Portfolio
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem asChild>
            <Link href="#">Portfolio Agency</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Portfolio Minimal</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Portfolio Masonry</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Case Studies</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center font-medium">
            Blog
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem asChild>
            <Link href="#">Blog Grid</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Blog Masonry</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Blog Metro</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Blog Sidebar</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="#" className="font-medium">
        Features
      </Link>
    </nav>
  );
}
