
import React, { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    toast({
      title: res.message,
      variant: res.success ? "default" : "destructive",
    });
    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Log in</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@site.com"
              required
              type="email"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="password"
            />
          </div>
          <Button className="w-full mt-2" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
