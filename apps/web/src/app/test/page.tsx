export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Tech Blog</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#" className="hover:text-blue-600">
              Articles
            </a>
            <a href="#" className="hover:text-blue-600">
              About
            </a>
            <a href="#" className="hover:text-blue-600">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Building Modern Web Apps</h2>
          <p className="text-lg opacity-90">
            Thoughts, tutorials, and deep dives into React, AI, and scalable
            systems.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">
            How to Build a Scalable React Application in 2026
          </h1>

          <div className="text-sm text-gray-500 mb-6">
            <span>By Sierra • </span>
            <span>April 2026 • </span>
            <span>10 min read</span>
          </div>

          <p className="mb-6 leading-relaxed">
            React has evolved significantly over the years, and in 2026,
            building scalable applications requires more than just components
            and state management. Developers need to think about performance,
            modularity, and developer experience from day one.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            1. Project Structure Matters
          </h2>
          <p className="mb-6 leading-relaxed">
            A well-organized project structure can save you hours of refactoring
            later. Instead of grouping files by type (components, hooks, utils),
            modern applications prefer feature-based architecture.
          </p>

          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
            {`src/
  features/
    auth/
      Login.jsx
      authSlice.js
    dashboard/
      Dashboard.jsx
  shared/
    components/
    hooks/`}
          </pre>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            2. State Management
          </h2>
          <p className="mb-6 leading-relaxed">
            In 2026, you don’t always need heavy libraries like Redux. Tools
            like Zustand, React Query, and server components have simplified
            state handling.
          </p>

          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li>Use local state for UI</li>
            <li>Use React Query for server state</li>
            <li>Use global state only when necessary</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            3. Performance Optimization
          </h2>
          <p className="mb-6 leading-relaxed">
            Performance is not optional. Lazy loading, memoization, and code
            splitting are essential tools for modern React apps.
          </p>

          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6">
            {`const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>`}
          </pre>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            4. AI Integration
          </h2>
          <p className="mb-6 leading-relaxed">
            AI is now a core part of modern applications. Integrating LLM APIs
            directly into your frontend or via backend services enables smarter
            user experiences.
          </p>

          <p className="mb-6 leading-relaxed">
            From chat interfaces to recommendation engines, React apps are
            becoming more intelligent and adaptive.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            5. Developer Experience
          </h2>
          <p className="mb-6 leading-relaxed">
            Tools like Vite, Turbopack, and modern linters have significantly
            improved the developer experience. Fast refresh, instant builds, and
            type safety are now expected.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 my-8">
            "A great developer experience leads to better products."
          </blockquote>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Conclusion</h2>
          <p className="leading-relaxed">
            Building scalable React applications in 2026 is about combining good
            architecture, performance optimization, and modern tooling. By
            following these principles, you can create apps that are not only
            efficient but also enjoyable to work on.
          </p>
        </article>

        {/* Comments Section */}
        <section className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="font-medium">Amit</p>
              <p className="text-sm text-gray-600">
                This was super helpful! Loved the section on project structure.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="font-medium">Riya</p>
              <p className="text-sm text-gray-600">
                Can you also write about backend scaling strategies?
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          © 2026 My Tech Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
