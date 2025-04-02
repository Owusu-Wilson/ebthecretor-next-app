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


      <Link href="/" className="font-medium">
        Home
      </Link>
      <Link href="/about" className="font-medium">
        About
      </Link>

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
            <Link href="#">Architecture</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Graphic Design</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">Blog Classic</Link>
          </DropdownMenuItem>
         
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/contact-us" className="font-medium">
        Contact
      </Link>
    </nav>
  );
}
