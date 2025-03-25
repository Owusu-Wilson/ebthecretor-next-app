import Link from "next/link";
import Image from "next/image";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Brand Design",
      description: "Our branding services cover every aspect of your brand's development, from logo creation to voice and style guidelines.",
      items: [
        "Brand Strategy Development",
        "Brand Identity Design",
        "Brand Experience Design",
        "Logo Design",
        "Brand Guidelines",
        "Brand Positioning"
      ],
      image: "https://ext.same-assets.com/969822492/4253944231.jpeg"
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "We create visually striking, user-centered solutions that drive engagement and growth for digital products.",
      items: [
        "User Interface Design",
        "User Experience Design",
        "Wireframing & Prototyping",
        "Interaction Design",
        "Usability Testing",
        "Information Architecture"
      ],
      image: "https://ext.same-assets.com/979205381/4253944231.jpeg"
    },
    {
      id: 3,
      title: "Web Development",
      description: "Our web development services deliver responsive, performance-optimized websites and web applications.",
      items: [
        "Front-end Development",
        "Custom Web Applications",
        "E-commerce Solutions",
        "CMS Implementation",
        "Web Performance Optimization",
        "API Integration"
      ],
      image: "https://ext.same-assets.com/969822492/2180965551.jpeg"
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "We help brands reach their audience through strategic digital marketing and content creation.",
      items: [
        "SEO & Content Strategy",
        "Social Media Marketing",
        "Email Marketing Campaigns",
        "Paid Advertising (PPC)",
        "Content Creation",
        "Performance Analysis"
      ],
      image: "https://ext.same-assets.com/979205381/2180965551.jpeg"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="container-kanik py-16 md:py-20">
        <div className="mb-8">
          <div className="mono mb-2">what we do</div>
          <h1 className="heading-lg mb-4">OUR SERVICES</h1>
        </div>

        <div className="flex items-center gap-2 text-sm mb-12">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span>Services</span>
        </div>
      </section>

      {/* Services Overview */}
      <section className="container-kanik pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h2 className="heading-md mb-6">
              We craft memorable digital experiences through innovative design and technology
            </h2>
          </div>

          <div className="md:col-span-7">
            <p className="body-lg mb-6">
              Our team of designers, developers, and strategists work together to deliver comprehensive solutions that help brands stand out in the digital landscape.
            </p>
            <p className="body-md text-muted-foreground">
              At Kanik, we understand that every project is unique. That's why we tailor our services to meet the specific needs of each client, ensuring that the end result is not only visually appealing but also strategically aligned with your business goals.
            </p>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="container-kanik pb-24">
        <div className="space-y-24">
          {services.map((service, index) => (
            <div key={service.id} className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={`${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                <h2 className="heading-sm mb-4">{service.title}</h2>
                <p className="body-md mb-8">{service.description}</p>

                <div className="border-t pt-6">
                  <h3 className="mono mb-4">What we offer</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-accent"
                  >
                    Start a project with us
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container-kanik py-16 bg-muted -mx-5 md:-mx-8 px-5 md:px-8">
        <div className="mb-12">
          <h2 className="heading-md mb-6">Our Process</h2>
          <p className="body-lg max-w-2xl">
            We follow a structured yet flexible process to ensure each project delivers maximum value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border-t pt-4">
            <div className="mono mb-2">01</div>
            <h3 className="text-xl font-medium mb-2">Discovery</h3>
            <p className="text-sm text-muted-foreground">
              We start by understanding your business, goals, and audience to establish a solid foundation for the project.
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="mono mb-2">02</div>
            <h3 className="text-xl font-medium mb-2">Strategy</h3>
            <p className="text-sm text-muted-foreground">
              Based on our findings, we develop a comprehensive strategy that outlines the approach and solutions.
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="mono mb-2">03</div>
            <h3 className="text-xl font-medium mb-2">Design & Development</h3>
            <p className="text-sm text-muted-foreground">
              Our creative team brings the strategy to life through design and development, with regular client feedback.
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="mono mb-2">04</div>
            <h3 className="text-xl font-medium mb-2">Launch & Support</h3>
            <p className="text-sm text-muted-foreground">
              We ensure a smooth launch and provide ongoing support to help you maximize the impact of your project.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-kanik py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-md mb-6">Ready to start your project?</h2>
            <p className="body-md mb-8">
              Get in touch with us to discuss how we can help bring your vision to life.
            </p>
            <Link
              href="/contact-us"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="relative aspect-square md:aspect-[4/3]">
            <Image
              src="https://ext.same-assets.com/979205381/3829689281.jpeg"
              alt="Ready to start your project"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
