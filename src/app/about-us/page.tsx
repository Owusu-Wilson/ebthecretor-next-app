import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      name: "Becky Hedges",
      position: "Art Director",
      image: "https://ext.same-assets.com/969822492/4281537766.jpeg"
    },
    {
      id: 2,
      name: "Ray Ramirez",
      position: "UI/UX Designer",
      image: "https://ext.same-assets.com/979205381/4281537766.jpeg"
    },
    {
      id: 3,
      name: "Caroline Crutchfield",
      position: "Brand Strategist",
      image: "https://ext.same-assets.com/969822492/4135620162.jpeg"
    },
    {
      id: 4,
      name: "Sylvia Knight",
      position: "Creative Director",
      image: "https://ext.same-assets.com/979205381/4135620162.jpeg"
    }
  ];

  const awards = [
    {
      id: 1,
      name: "Awwwards",
      category: "Best UX/UI Design Agency",
      year: "August, 2022"
    },
    {
      id: 2,
      name: "CSS Design Awards",
      category: "Top Branding & Identity Firm",
      year: "October, 2021"
    },
    {
      id: 3,
      name: "The Webby Awards",
      category: "Excellence in Web Design",
      year: "March, 2020"
    },
    {
      id: 4,
      name: "Red Dot Design Award",
      category: "Innovation in Digital Strategy",
      year: "November, 2019"
    },
    {
      id: 5,
      name: "D&AD Awards",
      category: "Creative Agency of the Year",
      year: "September, 2018"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="container-kanik py-16 md:py-20">
        <div className="mb-8">
          <div className="mono mb-2">who we are</div>
          <h1 className="heading-lg mb-4">ABOUT US</h1>
        </div>

        <div className="flex items-center gap-2 text-sm mb-12">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span>About Us</span>
        </div>
      </section>

      {/* About Section with Images */}
      <section className="container-kanik pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 relative aspect-square md:aspect-auto">
            <Image
              src="https://ext.same-assets.com/969822492/3829689281.jpeg"
              alt="Team working together"
              fill
              className="object-cover"
            />
          </div>

          <div className="md:col-span-3">
            <div className="bg-muted p-6 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-medium mb-4">We have 100+ satisfied clients</h3>
              <div className="mt-4">
                <span className="text-5xl md:text-6xl font-medium">90K</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="relative aspect-square">
              <Image
                src="https://ext.same-assets.com/979205381/4135620162.jpeg"
                alt="Office environment"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-primary text-primary-foreground p-6">
              <h3 className="text-xl font-medium mb-4">We helped to get companies with $35M+ funding</h3>
              <div className="mt-2">
                <span className="text-5xl font-medium">3 M</span>
                <span className="text-5xl font-medium block">5 +</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="container-kanik pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6 mono">
            who we are
          </div>

          <div className="md:col-span-6 space-y-8">
            <h2 className="heading-md">
              Kanik is a forward-thinking creative digital agency that crafts memorable digital experiences through innovative design and technology. We specialize in branding, identity development, UX/UI design, and web development.
            </h2>

            <div className="space-y-4">
              <p className="body-md">
                We craft bespoke digital experiences for businesses, corporations, and dynamic startups, blending innovation with intuitive design to help brands stand out in the digital landscape.
              </p>

              <p className="body-md">
                Our expertise lies in creating visually striking, user-centered solutions that drive engagement and growth. At Kanik, we are passionate about helping brands differentiate themselves and thrive in the ever-evolving digital landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="container-kanik pb-20">
        <h2 className="heading-sm mb-16">Awards & Recognitions</h2>

        <div className="space-y-8">
          {awards.map((award) => (
            <div key={award.id} className="grid grid-cols-12 border-t pt-4">
              <div className="col-span-3">
                <h3 className="font-medium">{award.name}</h3>
              </div>
              <div className="col-span-7">
                <p className="font-medium">{award.category}</p>
              </div>
              <div className="col-span-2 text-right">
                <p className="text-sm text-muted-foreground">{award.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container-kanik pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="space-y-4">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container-kanik pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-sm mb-6">How to get in touch with us</h2>
            <p className="mb-6 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel nisl proin vestibulum id eu.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="mono mb-2">Email</h3>
                <ul className="space-y-1">
                  <li className="text-sm">kaniktheme@info.com</li>
                  <li className="text-sm">kanik@neuronthemes.com</li>
                </ul>
              </div>

              <div>
                <h3 className="mono mb-2">Main office</h3>
                <p className="text-sm">Alsenstrasse 40, Rschlikon,<br />Zurigo, Zurich, 8803</p>
              </div>

              <div>
                <h3 className="mono mb-2">Phone</h3>
                <ul className="space-y-1">
                  <li className="text-sm">+(41) (044) 724-43-76</li>
                  <li className="text-sm">+ (818) 503-0441</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="heading-sm mb-6">Connect with us</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="mono block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 bg-muted/50 border border-border rounded-none"
                />
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
                <label htmlFor="message" className="mono block mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 bg-muted/50 border border-border rounded-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button type="submit" className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Background Text */}
      <div className="container-kanik overflow-hidden pb-16">
        <h2 className="text-[120px] md:text-[200px] font-bold text-muted/10 overflow-hidden whitespace-nowrap">
          DESIGNING EXPERIENCE
        </h2>
      </div>
    </>
  );
}
