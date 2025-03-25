import Link from "next/link";
import Image from "next/image";

export default function ContactUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="container-kanik py-16 md:py-20">
        <div className="mb-8">
          <div className="mono mb-2">get in touch</div>
          <h1 className="heading-lg mb-4">CONTACT US</h1>
        </div>

        <div className="flex items-center gap-2 text-sm mb-12">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span>Contact Us</span>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="container-kanik pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-sm mb-6">Get in touch</h2>
            <p className="mb-8 text-muted-foreground max-w-md">
              Have a project in mind or want to find out more about how we can help your business?
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="mono mb-2">Email</h3>
                <ul className="space-y-1">
                  <li className="text-sm">hello@kanik.com</li>
                  <li className="text-sm">info@kanik.com</li>
                </ul>
              </div>

              <div>
                <h3 className="mono mb-2">Phone</h3>
                <ul className="space-y-1">
                  <li className="text-sm">+(41) 724-43-76</li>
                  <li className="text-sm">+ (818) 503-0441</li>
                </ul>
              </div>

              <div>
                <h3 className="mono mb-2">Our offices</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">London</h4>
                    <p className="text-sm">40 Augustus St, District Nine, London, UK</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Cape Town</h4>
                    <p className="text-sm">3rd Floor, 40 Augustus St, District Nine, Cape Town, South Africa</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">New York</h4>
                    <p className="text-sm">6823 Ethel Ave, North Hollywood, New York, 91605</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="heading-sm mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="mono block mb-2">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full p-3 bg-muted/50 border border-border rounded-none"
                  />
                </div>

                <div>
                  <label htmlFor="last-name" className="mono block mb-2">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full p-3 bg-muted/50 border border-border rounded-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mono block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-muted/50 border border-border rounded-none"
                />
              </div>

              <div>
                <label htmlFor="company" className="mono block mb-2">Company</label>
                <input
                  type="text"
                  id="company"
                  className="w-full p-3 bg-muted/50 border border-border rounded-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mono block mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 bg-muted/50 border border-border rounded-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mono block mb-2">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full p-3 bg-muted/50 border border-border rounded-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="privacy"
                    type="checkbox"
                    className="w-4 h-4 border border-input bg-background"
                  />
                </div>
                <label htmlFor="privacy" className="ml-2 text-sm text-muted-foreground">
                  I accept the privacy policy and allow Kanik to use my data to respond to my inquiry.
                </label>
              </div>

              <button type="submit" className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container-kanik pb-20">
        <div className="bg-muted aspect-[21/9] w-full">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            [Interactive Map Would Display Here]
          </div>
        </div>
      </section>

      {/* Background Text */}
      <div className="container-kanik overflow-hidden pb-16">
        <h2 className="text-[120px] md:text-[200px] font-bold text-muted/10 overflow-hidden whitespace-nowrap">
          GET IN TOUCH
        </h2>
      </div>
    </>
  );
}
