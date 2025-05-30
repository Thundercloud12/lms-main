import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Lottie from "lottie-react";
import navvAnimation from "../assets/reading.json";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

const Navbar = ({ setShowChangePasswordModal }) => {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, token, role, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  const toggleDark = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    console.log("Auth state changed in Navbar:", { user, token, role });
  }, [token, navigate]); // watch token

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
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          <h1 className="text-3xl font-bold tracking-tight whitespace-nowrap">
            Library System
          </h1>
          <div className="h-10 w-28 p-1 rounded-b-2xl bg-gradient-to-br from-[#facc15] via-[#f59e0b] to-[#d97706] shadow-lg animate-pulse hover:scale-105 transition-transform duration-300">
            <Lottie animationData={navvAnimation} loop />
          </div>
        </div>

        <div className="hidden lg:flex gap-6 text-lg ml-auto">
          <HoverLink to="/" label="Home" dark={darkMode} />
          {token && user && (
            <HoverLink
              to={role === "admin" ? "/admin-login" : `/dashboard/${user?.user_id}`}
              label="Dashboard"
              dark={darkMode}
            />
          )}
          <HoverLink to="/support" label="Support" dark={darkMode} />
        </div>

        <div className="flex items-center gap-4 ml-4">
          <button
            onClick={toggleDark}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {token ? (
           <div className="dropdown dropdown-end">
  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost btn-circle avatar"
  >
    <div className="w-10 rounded-full border-2 border-white">
      <img
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName || "User"}`}
        alt="User"
      />
    </div>
  </div>

  <ul
    tabIndex={0}
    className={`mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content rounded-box w-52 ${
      darkMode ? "bg-[#2b2b2b] text-white" : "bg-white text-[#4a3628]"
    }`}
  >
    <li>
      <span className="text-sm font-semibold">{user?.fullName || "User"}</span>
    </li>
    <li>
      <span className="text-sm">{user?.email || "email@example.com"}</span>
    </li>
    <li>
      <button
        onClick={handleLogout}
        className="btn btn-sm bg-[#4a3628] text-white hover:bg-[#322317]"
      >
        Logout
      </button>
    </li>
    <li>
      <button
        onClick={() => setShowChangePasswordModal(true)}
        className="btn btn-sm bg-[#4a3628] text-white hover:bg-[#322317]"
      >
        Change Password
      </button>
    </li>
  </ul>
</div>

          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline border-[#4a3628] text-[#4a3628] hover:bg-[#4a3628] hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn bg-[#4a3628] text-white hover:bg-[#322317]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

const HoverLink = ({ to, label, dark }) => (
  <Link
    to={to}
    className={`relative group transition duration-300 ${
      dark ? "text-white" : "text-[#4a3628]"
    }`}
  >
    {label}
    <span
      className={`absolute left-1/2 bottom-0 w-0 h-[2px] ${
        dark ? "bg-white" : "bg-[#4a3628]"
      } transition-all duration-300 transform -translate-x-1/2 group-hover:w-full`}
    />
  </Link>
);

export default Navbar;
