import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <div className="flex flex-col gap-6 pt-10">
          <div className="space-y-2">
            <h4 className="font-medium">Home</h4>
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Main Home
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Creative Agency
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Personal Portfolio
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Pages</h4>
            <div className="flex flex-col space-y-1">
              <Link
                href="/about-us"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Our Team
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Portfolio</h4>
            <div className="flex flex-col space-y-1">
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Portfolio Agency
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Portfolio Masonry
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Case Studies
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Blog</h4>
            <div className="flex flex-col space-y-1">
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Blog Grid
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Blog Masonry
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-accent p-2 -ml-2"
              >
                Blog Sidebar
              </Link>
            </div>
          </div>
          <div className="pt-4">
            <Link
              href="#"
              className="inline-flex rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground"
            >
              Get Theme
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
