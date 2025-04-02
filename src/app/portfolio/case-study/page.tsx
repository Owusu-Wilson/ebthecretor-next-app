import Link from "next/link";
import Image from "next/image";

export default function CaseStudy() {
  const caseStudy = {
    title: "Earth's Palette",
    subtitle: "A Brand Identity System for an Eco-Conscious Cosmetics Brand",
    client: "Earth's Palette Inc.",
    year: "2023",
    duration: "12 Weeks",
    services: ["Brand Strategy", "Identity Design", "Packaging Design", "Website Design"],
    overview: "Earth's Palette approached Kanik with a vision for a sustainable, eco-conscious cosmetics brand that needed to stand out in a crowded market. The challenge was to create a brand identity that would communicate their commitment to natural ingredients and sustainable practices while still feeling premium and sophisticated.",
    challenge: "The cosmetics industry is saturated with brands claiming to be 'natural' and 'sustainable.' Our challenge was to create a distinctive visual identity that would authentically represent Earth's Palette's values and resonate with their target audience of environmentally-conscious consumers who also demand high-quality products.",
    approach: "We began with an extensive research phase, immersing ourselves in the brand's ethos, products, and target audience. Through collaborative workshops with the client, we identified key brand attributes: organic, transparent, sophisticated, and earth-friendly. These attributes became the foundation for our design decisions. We developed a comprehensive brand strategy before moving into the visual identity phase, ensuring that every design choice was purposeful and aligned with the brand's mission.",
    results: "The new brand identity successfully positioned Earth's Palette as a premium eco-conscious cosmetics brand. Within six months of the rebrand launch, Earth's Palette reported a 45% increase in online sales and a 30% increase in retail store presence. The brand received recognition from several sustainable business awards and has been featured in leading beauty publications.",
    images: [
      "https://ext.same-assets.com/969822492/4253944231.jpeg",
      "https://ext.same-assets.com/979205381/4253944231.jpeg",
      "https://ext.same-assets.com/969822492/2180965551.jpeg",
      "https://ext.same-assets.com/979205381/2180965551.jpeg",
      "https://ext.same-assets.com/979205381/3829689281.jpeg"
    ],
    testimonial: {
      quote: "Kanik truly understood our vision and translated it into a beautiful, cohesive brand identity that perfectly captures what Earth's Palette stands for. The strategy-first approach ensured that our brand not only looks good but also communicates our values effectively to our customers.",
      author: "Maria Gonzalez",
      role: "Founder & CEO, Earth's Palette"
    },
    nextProject: {
      title: "Cosmic Chronicles",
      slug: "/portfolio/case-study"
    }
  };

  return (
    <>
      {/* Hero Image */}
      <section className="w-full relative h-[70vh]">
        <Image
          src={caseStudy.images[0]}
          alt={caseStudy.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
          <div className="container-kanik pb-16 text-white">
            <div className="mono mb-2">Brand Identity</div>
            <h1 className="heading-lg mb-2">{caseStudy.title}</h1>
            <p className="text-xl max-w-2xl">{caseStudy.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="container-kanik py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <h2 className="heading-sm mb-6">Project Overview</h2>
            <p className="body-lg mb-12">{caseStudy.overview}</p>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-medium mb-4">The Challenge</h3>
                <p className="body-md">{caseStudy.challenge}</p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Our Approach</h3>
                <p className="body-md">{caseStudy.approach}</p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Results</h3>
                <p className="body-md">{caseStudy.results}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="bg-muted p-8 sticky top-24">
              <h3 className="text-xl font-medium mb-6">Project Details</h3>

              <div className="space-y-6">
                <div>
                  <div className="mono mb-2">Client</div>
                  <div>{caseStudy.client}</div>
                </div>

                <div>
                  <div className="mono mb-2">Year</div>
                  <div>{caseStudy.year}</div>
                </div>

                <div>
                  <div className="mono mb-2">Duration</div>
                  <div>{caseStudy.duration}</div>
                </div>

                <div>
                  <div className="mono mb-2">Services</div>
                  <ul className="space-y-1">
                    {caseStudy.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="container-kanik pb-24">
        <h2 className="heading-sm mb-12">Project Gallery</h2>

        <div className="space-y-12">
          {/* Large Image */}
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src={caseStudy.images[1]}
              alt={`${caseStudy.title} - Full Width Image`}
              fill
              className="object-cover"
            />
          </div>

          {/* Two Column Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={caseStudy.images[2]}
                alt={`${caseStudy.title} - Detail 1`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={caseStudy.images[3]}
                alt={`${caseStudy.title} - Detail 2`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Full Width Image */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={caseStudy.images[4]}
              alt={`${caseStudy.title} - Overview`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="container-kanik py-16 bg-muted md:-mx-8 px-5 md:px-8 mb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
              <path d="M10 11L4 18V11M16 11L10 18V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <blockquote className="text-xl md:text-2xl font-medium text-center mb-8">
            "{caseStudy.testimonial.quote}"
          </blockquote>

          <div className="text-center">
            <div className="font-medium">{caseStudy.testimonial.author}</div>
            <div className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="container-kanik pb-20">
        <div className="text-center">
          <div className="mono mb-4">Next Project</div>
          <h2 className="heading-md mb-6">{caseStudy.nextProject.title}</h2>
          <Link
            href={caseStudy.nextProject.slug}
            className="inline-flex items-center gap-2 font-medium hover:text-accent"
          >
            View Project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container-kanik py-16 bg-primary text-primary-foreground -mx-5 md:-mx-8 px-5 md:px-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-sm mb-6">Ready to start your project?</h2>
          <p className="body-md mb-8">
            We'd love to help bring your brand vision to life with a strategic, thoughtful approach.
          </p>
          <Link
            href="/contact-us"
            className="inline-block px-8 py-3 bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
