
import React from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

type BlogPost = {
  id: number;
  title: string;
  content: string;
  author: string;
  timestamp: string;
};

// Demo data
const DEMO_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to Blog Guardian!",
    content:
      "This is a demo blog post. Only admins can create, edit, or delete posts. Login as 'admin@site.com' with password 'password'!",
    author: "Alice",
    timestamp: "2024-04-25T10:00:00Z"
  },
  {
    id: 2,
    title: "Great App Security with RBAC",
    content:
      "Role-Based Access Control is the key to secure web apps. Users can read; admins can manage content.",
    author: "Alice",
    timestamp: "2024-04-25T14:00:00Z"
  }
];

const BlogFeed: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNewPost = () => {
    if (!user) {
      toast({
        title: "Please log in as admin to create posts.",
        description: "Only admins can create new blog posts. Log in as admin@site.com / password.",
        variant: "destructive",
        action: (
          <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        ),
      });
      return;
    }
    if (user.role !== "admin") {
      toast({
        title: "Only admins can create posts.",
        description: "You are currently signed in as a regular user.",
        variant: "destructive",
      });
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 animate-fade-in-fast">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Sparkles className="text-blue-500 animate-bounce" /> Blog Posts
        </h2>
        <Button onClick={handleNewPost} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow hover:scale-105 transition-transform">
          New Post
        </Button>
      </div>
      <div className="space-y-6">
        {DEMO_BLOGS.length === 0 && (
          <Card className="p-8 flex flex-col items-center bg-gray-100 border-dashed border-2 border-gray-300 animate-fade-in">
            <img src="https://illustrations.popsy.co/gray/no-data.svg" className="w-28 mb-4" alt="No blogs" />
            <p className="text-gray-500 text-lg mb-2">No blog posts yet.</p>
            <Button onClick={handleNewPost} variant="default">Be the first to post!</Button>
          </Card>
        )}
        {DEMO_BLOGS.map((blog) => (
          <Card
            key={blog.id}
            className="p-6 rounded shadow hover:shadow-xl transition-shadow bg-white hover:bg-blue-50 border border-gray-200"
          >
            <h3 className="text-xl font-bold mb-2 text-blue-900">{blog.title}</h3>
            <p className="text-gray-800 mb-3">{blog.content}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>By {blog.author}</span>
              <span>{new Date(blog.timestamp).toLocaleString()}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogFeed;
