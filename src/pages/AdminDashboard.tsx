
import React, { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

// Demo post list, replace with real API call
const INITIAL_POSTS = [
  {
    id: 1,
    title: "Welcome to Blog Guardian!",
    content: "This is a demo blog post. Only admins can create, edit, or delete posts.",
    author: "Alice",
    timestamp: "2024-04-25T10:00:00Z"
  },
  {
    id: 2,
    title: "Great App Security with RBAC",
    content: "Role-Based Access Control is the key to secure web apps. Users can read; admins can manage content.",
    author: "Alice",
    timestamp: "2024-04-25T14:00:00Z"
  }
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [creating, setCreating] = useState(false);

  if (!user || user.role !== "admin") {
    toast({
      title: "Admins only. Please log in as admin.",
      description: "Access denied – only admins can manage blog posts.",
      variant: "destructive",
      action: (
        <Button size="sm" variant="outline" onClick={() => navigate("/login")}>Go to Login</Button>
      ),
    });
    navigate("/login");
    return null;
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) {
      toast({
        title: "Title and content are required.",
        description: "Please fill in both the title and content fields.",
        variant: "destructive"
      });
      return;
    }
    const newPost = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      author: user.name,
      timestamp: new Date().toISOString()
    };
    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    setCreating(false);
    toast({ title: "Post created!", description: "Your blog post is now live." });
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
    toast({ title: "Post deleted.", description: "The post has been removed." });
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 animate-fade-in-fast">
      <div className="mb-6 flex items-center gap-3">
        <Sparkles className="text-blue-500 rotate-12 animate-spin-slow" />
        <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
      </div>
      <Card className="mb-6 p-6 shadow-lg animate-fade-in">
        {creating ? (
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              className="w-full border border-blue-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Post Title"
              required
            />
            <textarea
              className="w-full border border-blue-200 px-3 py-2 rounded min-h-[100px] focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Content"
              required
            />
            <div className="flex gap-4">
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow">Create</Button>
              <Button variant="secondary" type="button" onClick={() => setCreating(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button onClick={() => setCreating(true)} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow">+ New Post</Button>
        )}
      </Card>
      <div className="space-y-4">
        {posts.length === 0 && (
          <Card className="p-8 flex flex-col items-center bg-gray-100 border-dashed border-2 border-gray-300">
            <img src="https://illustrations.popsy.co/gray/no-data.svg" className="w-28 mb-4" alt="No posts yet" />
            <p className="text-gray-500 text-lg mb-2">No posts yet.</p>
            <Button onClick={() => setCreating(true)} variant="default">Start your first post</Button>
          </Card>
        )}
        {posts.map((post) => (
          <Card key={post.id} className="p-5 flex flex-col gap-2 bg-white rounded shadow hover:bg-blue-50 border border-gray-200 transition-colors">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-900">{post.title}</h3>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                Delete
              </Button>
            </div>
            <p className="text-gray-800">{post.content}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>By {post.author}</span>
              <span>{new Date(post.timestamp).toLocaleString()}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
