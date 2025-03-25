import Link from "next/link";
import Image from "next/image";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Behind the Scenes: A Day in the Life of a Creative Agency",
      category: "Agency Life",
      date: "March 15, 2023",
      excerpt: "Take a peek behind the curtain and discover what a typical day looks like at Kanik, from brainstorming sessions to client presentations.",
      image: "https://ext.same-assets.com/969822492/4253944231.jpeg",
      author: "Ryan Parker",
      authorRole: "Creative Director"
    },
    {
      id: 2,
      title: "Why Branding is More Than Just a Logo",
      category: "Branding",
      date: "April 3, 2023",
      excerpt: "In this article, we explore the multifaceted nature of branding and why it encompasses far more than just visual elements like logos.",
      image: "https://ext.same-assets.com/979205381/4253944231.jpeg",
      author: "Laura Chen",
      authorRole: "Brand Strategist"
    },
    {
      id: 3,
      title: "How to Create a Seamless User Experience Across All Platforms",
      category: "UX Design",
      date: "May 21, 2023",
      excerpt: "Consistency is key when it comes to user experience. Learn how to create a cohesive experience across web, mobile, and other touchpoints.",
      image: "https://ext.same-assets.com/969822492/2180965551.jpeg",
      author: "Michael Rodriguez",
      authorRole: "UX Lead"
    },
    {
      id: 4,
      title: "Building a Brand That Connects: Key Strategies for Success",
      category: "Branding",
      date: "June 12, 2023",
      excerpt: "Emotional connection is what separates good brands from great ones. Discover strategies to create meaningful connections with your audience.",
      image: "https://ext.same-assets.com/979205381/2180965551.jpeg",
      author: "Sarah Johnson",
      authorRole: "Marketing Director"
    },
    {
      id: 5,
      title: "The Role of Animation in Modern Web Design",
      category: "Web Design",
      date: "July 8, 2023",
      excerpt: "From subtle micro-interactions to eye-catching page transitions, animation has become an essential part of creating engaging web experiences.",
      image: "https://ext.same-assets.com/979205381/3829689281.jpeg",
      author: "David Lee",
      authorRole: "Motion Designer"
    },
    {
      id: 6,
      title: "10 Website Design Trends Every Business Should Know in, 2023",
      category: "Web Design",
      date: "August 22, 2023",
      excerpt: "Stay ahead of the curve with our roundup of the most important web design trends that are shaping the digital landscape this year.",
      image: "https://ext.same-assets.com/969822492/3829689281.jpeg",
      author: "Emma Wilson",
      authorRole: "UI Designer"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="container-kanik py-16 md:py-20">
        <div className="mb-8">
          <div className="mono mb-2">our insights</div>
          <h1 className="heading-lg mb-4">BLOG</h1>
        </div>

        <div className="flex items-center gap-2 text-sm mb-12">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span>Blog</span>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container-kanik pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="mono mb-2">{blogPosts[0].category}</div>
            <h2 className="heading-sm mb-4">{blogPosts[0].title}</h2>
            <p className="body-md mb-6">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-muted"></div>
              <div>
                <div className="text-sm font-medium">{blogPosts[0].author}</div>
                <div className="text-xs text-muted-foreground">{blogPosts[0].authorRole}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-6">{blogPosts[0].date}</div>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-accent"
            >
              Read More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container-kanik pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <div key={post.id} className="flex flex-col h-full">
              <div className="relative aspect-[16/9] overflow-hidden mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-grow">
                <div className="mono mb-2">{post.category}</div>
                <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              </div>

              <div className="mt-auto">
                <div className="text-sm text-muted-foreground mb-4">{post.date}</div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-accent"
                >
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-kanik py-16 bg-muted -mx-5 md:-mx-8 px-5 md:px-8 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-sm mb-4">Subscribe to Our Newsletter</h2>
          <p className="body-md mb-8 max-w-xl mx-auto">
            Stay up to date with the latest insights, trends, and tips from our team of experts.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-3 bg-background border border-border"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="container-kanik pb-20">
        <h2 className="heading-sm mb-8">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="#" className="block border p-6 hover:bg-muted/50 transition-colors">
            <div className="mono mb-2">01</div>
            <h3 className="text-xl font-medium">Branding</h3>
            <div className="text-sm text-muted-foreground mt-2">12 Articles</div>
          </Link>

          <Link href="#" className="block border p-6 hover:bg-muted/50 transition-colors">
            <div className="mono mb-2">02</div>
            <h3 className="text-xl font-medium">UX Design</h3>
            <div className="text-sm text-muted-foreground mt-2">8 Articles</div>
          </Link>

          <Link href="#" className="block border p-6 hover:bg-muted/50 transition-colors">
            <div className="mono mb-2">03</div>
            <h3 className="text-xl font-medium">Web Design</h3>
            <div className="text-sm text-muted-foreground mt-2">10 Articles</div>
          </Link>

          <Link href="#" className="block border p-6 hover:bg-muted/50 transition-colors">
            <div className="mono mb-2">04</div>
            <h3 className="text-xl font-medium">Agency Life</h3>
            <div className="text-sm text-muted-foreground mt-2">6 Articles</div>
          </Link>
        </div>
      </section>
    </>
  );
}
