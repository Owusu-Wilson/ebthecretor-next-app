import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container-kanik py-12">
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <div className="mb-8 md:mb-0">
            <h4 className="text-lg font-medium mb-4">Get in touch</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground max-w-xs">
                We work with global brands from startups to industry leaders. Let's talk
              </p>
              <Link href="#" className="text-sm hover:text-accent underline underline-offset-4">
                Let's talk
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h5 className="mono mb-4">Menu</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm hover:text-accent">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pages" className="text-sm hover:text-accent">
                    Pages
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-sm hover:text-accent">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-sm hover:text-accent">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mono mb-4">Social</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-accent">
                    Behance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-accent">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-accent">
                    Dribbble
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-accent">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h5 className="mono mb-4">Cape Town <span className="float-right text-muted-foreground">13:21</span></h5>
              <address className="not-italic">
                <p className="text-sm mb-2">
                  3rd Floor, 40 Augustus St, District Nine, Cape Town South Africa, 7846
                </p>
                <Link href="#" className="text-sm hover:text-accent">
                  Get Directions
                </Link>
              </address>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between pt-8 border-t">
          <div className="mono">51.5072 N, 0.1276 W</div>
          <div className="mono">2025</div>
          <div className="mono">info@ebthecreator.com</div>
        </div>
      </div>
    </footer>
  );
}
