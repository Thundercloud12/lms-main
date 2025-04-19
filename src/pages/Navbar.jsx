import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Moon, Sun } from "lucide-react";
import Lottie from "lottie-react";
import navvAnimation from "../assets/reading.json";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const Navbar = ({ setShowChangePasswordModal }) => {
  const { darkMode, setDarkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const userRole = localStorage.getItem("role");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    setRole(userRole);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDark = () => setDarkMode((prev) => !prev);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 shadow-xl transition-all duration-300 backdrop-blur-lg ${
        darkMode
          ? "bg-[#1f1f1f] text-white"
          : "bg-gradient-to-br from-[#f1e2d0] to-[#c2a27a] text-[#4a3628]"
      }`}
    >
      <div className="navbar max-w-7xl mx-auto px-6 py-4 font-[Oxygen]">
        {/* Logo + Title + Lottie */}
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          <h1 className="text-3xl font-bold tracking-tight whitespace-nowrap">
            Library System
          </h1>
          <div className
