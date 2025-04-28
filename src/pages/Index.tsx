import React from "react";
import Navbar from "@/components/Navbar";
import BlogFeed from "./BlogFeed";

const Index = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <header className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-12 shadow mb-6 animate-fade-in">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-yellow-300">BlogGuardian</span></h1>
            <p className="text-lg opacity-90 max-w-2xl">
              A modern role-based blog platform. <span className="font-semibold">Admins</span> manage all content. <span className="font-semibold">Users</span> enjoy curated, secure posts.
            </p>
            <ul className="mt-4 mb-2 list-disc pl-5 text-white/90">
              <li>🔒 Secure Role-Based Access</li>
              <li>📝 Real-Time Blog Feeds</li>
              <li>🎨 Beautiful, Responsive UI</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="/login" className="px-5 py-2 rounded bg-white/90 text-blue-600 font-semibold hover:bg-yellow-200 shadow transition">Sign In as User</a>
              <a href="/login" className="px-5 py-2 rounded bg-white/90 text-indigo-700 font-semibold border border-indigo-800 hover:bg-indigo-100 transition">Sign In as Admin</a>
            </div>
          </div>
        </div>
      </header>
      <main>
        <BlogFeed />
      </main>
    </div>
  );
};

export default Index;
