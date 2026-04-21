import React from "react";

const posts = [
  {
    id: 1,
    title: "Getting Started with AI in 2026",
    excerpt:
      "Learn how to kickstart your journey into AI and automation even without a deep ML background.",
    author: "Sierra",
    date: "April 20, 2026",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
  },
  {
    id: 2,
    title: "Building Scalable Apps with React",
    excerpt:
      "Best practices to structure your React apps for scalability and performance.",
    author: "Sierra",
    date: "April 18, 2026",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200",
  },
  {
    id: 3,
    title: "Automation Workflows for Developers",
    excerpt:
      "How to use automation tools to save hours of manual work every week.",
    author: "Sierra",
    date: "April 15, 2026",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200",
  },
];

const BlogCard = ({ post }: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
        <div className="text-xs text-gray-400">
          {post.author} • {post.date}
        </div>
      </div>
    </div>
  );
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Blog</h1>
          <nav className="space-x-6 text-sm">
            <a href="#" className="hover:text-blue-500">
              Home
            </a>
            <a href="#" className="hover:text-blue-500">
              Articles
            </a>
            <a href="#" className="hover:text-blue-500">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-2">
            Insights on AI, Dev & Automation
          </h2>
          <p className="text-sm opacity-90">
            Practical guides, real-world learnings, and engineering insights.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          © 2026 My Blog. Built with React.
        </div>
      </footer>
    </div>
  );
}
