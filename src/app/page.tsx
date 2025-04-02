'use client';

import Link from "next/link";
import Image from "next/image";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
export default function Home() {
   // Track when the stats section comes into view
   const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const portfolioItems = [
    {
      id: 1,
      title: "Earth's Palette",
      category: "Art Direction",
      image: "https://ext.same-assets.com/979205381/3829689281.jpeg"
    },
    {
      id: 2,
      title: "Exploring Visual Vibrancy",
      category: "Branding",
      image: "https://burst.shopifycdn.com/photos/model-in-gold-fashion.jpg"
    },
    {
      id: 3,
      title: "Cosmic Chronicles",
      category: "Art Direction",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
    },
    {
      id: 4,
      title: "Wanderlust",
      category: "3D Commercial",
      image: "https://img.freepik.com/free-psd/world-art-day-celebration-poster-template_23-2150197403.jpg?t=st=1742924596~exp=1742928196~hmac=74fa9c1ae95d11c51bbf779a502545756c4c94ae10dd711445750bb700bb0a36&w=740"
    },
    {
      id: 5,
      title: "Binary Symphony",
      category: "Art Direction",
      image: "https://ext.same-assets.com/979205381/3829689281.jpeg"
    },
    {
      id: 6,
      title: "Binary Symphony",
      category: "Art Direction",
      image: "https://ext.same-assets.com/979205381/3829689281.jpeg"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="container-kanik py-16 md:py-24">
        <div className="flex mb-12 flex-col justify-center items-center">
          <div className="mono mb-2">51.5072 N, 0.1276 W</div>
          <h1 className="heading-xl mb-4">
            <span className="font-light text-muted-foreground">A digital Design</span>
            <br />
            <span>Creative Studio</span>
          </h1>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container-kanik">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {portfolioItems.map((item) => (
            <Link
              key={item.id}
              href="/portfolio/case-study" // Changed to a static route
              className="group relative block overflow-hidden transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="container-kanik py-20 md:py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t pt-12">
          <div>
            <h3 className="heading-lg mb-1">
              {statsInView ? (
                <CountUp 
                  end={370} 
                  duration={2} 
                  suffix="+" 
                  className="text-transparent bg-clip-text bg-black"
                />
              ) : '0+'}
            </h3>
            <p className="mono">Projects</p>
          </div>
          <div>
            <h3 className="heading-lg mb-1">
              {statsInView ? (
                <CountUp 
                  end={30} 
                  duration={2} 
                  suffix="+" 
                  className="text-transparent bg-clip-text bg-black"
                />
              ) : '0+'}
            </h3>
            <p className="mono">Clients</p>
          </div>
          <div>
            <h3 className="heading-lg mb-1">
              {statsInView ? (
                <CountUp 
                  end={150} 
                  duration={2} 
                  suffix="+" 
                  className="text-transparent bg-clip-text bg-black"
                />
              ) : '0+'}
            </h3>
            <p className="mono">Awards</p>
          </div>
          <div>
            <h3 className="heading-lg mb-1">
              {statsInView ? (
                <CountUp 
                  end={250} 
                  duration={2} 
                  suffix="K" 
                  className="text-transparent bg-clip-text bg-black"
                />
              ) : '0K'}
            </h3>
            <p className="mono">Followers</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container-kanik pb-20">
        <h2 className="heading-md mb-12">BRAND</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="body-lg mb-6 max-w-xl">
              Our branding services cover every aspect of your brand's development, from logo
              creation to voice and style guidelines.
            </p>
            <Link href="#" className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-accent">
              Learn more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div className="space-y-10">
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Brand Strategy Development</h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Brand Identity Design</h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Brand Experience Design</h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Services */}
      <section className="container-kanik pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <h2 className="heading-md mb-2">UI/UX</h2>
          </div>
          <div className="border-t pt-4 flex items-center justify-between pr-4">
            <h3 className="text-xl font-medium">ANIMATION</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="border-t pt-4 flex items-center justify-between pr-4">
            <h3 className="text-xl font-medium">PRODUCT</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container-kanik">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex gap-4">
              <div className="rounded-full overflow-hidden w-12 h-12 relative">
                <div className="bg-kanik-brown-300 w-full h-full"></div>
              </div>
              <div className="space-y-2">
                <p className="text-xl">
                  "Kanik truly understood our audience and created a stunning, easy-to-navigate website."
                </p>
                <div>
                  <p className="text-sm font-medium">Ryan Parker</p>
                  <p className="text-xs text-muted-foreground">CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="container-kanik py-20">
        <h2 className="text-2xl mb-12">Our Clients</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center p-4">
              <div className="text-xl font-semibold text-muted-foreground opacity-80">
                {['kotona.', 'archzilla', 'KAON', 'OTIVAR', 'conlectio.', 'Square', 'Fusion'][i] || 'Brand'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
