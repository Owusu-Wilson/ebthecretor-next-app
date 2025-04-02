import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container-kanik flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center font-semibold">
            <span className="text-lg font-semibold tracking-tight">ebthecreator</span>
          </Link>
          <MainNav className="hidden md:flex" />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle/>
          <Link
            href="/admin/dashboard"
            className="hidden rounded-md px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:inline-block"
          >
            Admin
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
