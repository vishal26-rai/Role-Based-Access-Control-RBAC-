
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-6 mb-8 shadow">
      <Link to="/" className="font-bold text-2xl text-blue-600">BlogGuardian</Link>
      <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Feed</Link>
      {user && user.role === "admin" && (
        <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition">
          Admin Dashboard
        </Link>
      )}
      <div className="ml-auto flex items-center gap-4">
        {!user ? (
          <>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <span className="text-gray-500">{user.name} ({user.role})</span>
            <Button variant="secondary" onClick={() => { logout(); navigate("/"); }}>
              Log Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
