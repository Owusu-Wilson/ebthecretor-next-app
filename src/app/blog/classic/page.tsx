import Head from "next/head";
import Image from "next/image";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>How to Create a Seamless User Experience Across All Platforms</title>
        <meta name="description" content="Learn best practices for UX consistency." />
      </Head>

      {/* Header */}
      <header className="py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-dark">Kanik</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary">Blog</a>
              <a href="#" className="text-gray-600 hover:text-primary">About</a>
            </nav>
            <button className="md:hidden">☰</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-light">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            How to Create a Seamless User Experience Across All Platforms
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Best practices for ensuring a smooth and consistent experience on web, mobile, and desktop.
          </p>
          <div className="mt-8 flex justify-center items-center space-x-4">
            <div className="flex items-center">
              <Image
                src="/author.jpg" // Replace with your image
                alt="Author"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-gray-700">Jane Doe</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">May 15, 2023</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container mx-auto px-4 my-12 max-w-4xl">
        <Image
          src="/blog-featured-image.jpg" // Replace with your image
          alt="UX Design"
          width={1200}
          height={600}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Blog Content */}
      <article className="container mx-auto px-4 max-w-2xl prose prose-lg prose-indigo">
        <h2>Introduction</h2>
        <p>
          Creating a seamless user experience (UX) across multiple platforms is crucial for brand consistency and user satisfaction. Whether your users interact with your product on mobile, desktop, or tablet, they should feel a sense of familiarity.
        </p>

        <h2>1. Consistent Design Language</h2>
        <p>
          Use the same color schemes, typography, and UI components across all platforms. Tools like <strong>Figma</strong> and <strong>Storybook</strong> help maintain design consistency.
        </p>

        <h2>2. Responsive & Adaptive Design</h2>
        <p>
          Ensure your layouts adapt smoothly to different screen sizes. CSS Grid, Flexbox, and frameworks like <strong>Tailwind CSS</strong> make this easier.
        </p>

        <h2>3. Performance Optimization</h2>
        <p>
          Slow load times break UX. Optimize images, use lazy loading, and leverage CDNs for faster delivery.
        </p>

        <blockquote>
          "A seamless experience isn’t just about looks—it’s about how effortlessly users can achieve their goals."
        </blockquote>

        <h2>Conclusion</h2>
        <p>
          By following these principles, you can ensure users have a smooth and enjoyable experience, no matter how they access your product.
        </p>
      </article>

      {/* Footer */}
      <footer className="py-12 bg-dark text-white mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Kanik. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}