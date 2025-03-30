import React, { useContext, useState } from "react";
import { assets } from "../assests/assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { IoSearchSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
    navigate,
  } = useContext(ShopContext);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setProfileDropdown(false);
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/collection", name: "Collection" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={assets.logo} alt="Company Logo" className=" h-16 w-auto" />
           
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-1 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setShowSearch(true)}
              className="p-1 text-gray-600 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <IoSearchSharp className="h-5 w-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  token
                    ? setProfileDropdown(!profileDropdown)
                    : navigate("/login")
                }
                className="p-1 text-gray-600 hover:text-primary transition-colors"
                aria-label="Profile"
              >
                <img
                  src={assets.profile_icon}
                  className="h-6 w-6"
                  alt="Profile"
                />
              </button>

              <AnimatePresence>
                {profileDropdown && token && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdown(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-1 text-gray-600 hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <FaCartShopping className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuVisible(true)}
              className="p-1 text-gray-600 hover:text-primary sm:hidden transition-colors"
              aria-label="Menu"
            >
              <RiMenu3Line className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-50 bg-white sm:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <Link
                  to="/"
                  className="flex items-center"
                  onClick={() => setMenuVisible(false)}
                >
                  <img
                    src={assets.logo}
                    alt="Company Logo"
                    className="h-8 w-auto"
                  />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    FOREVER
                  </span>
                </Link>
                <button
                  onClick={() => setMenuVisible(false)}
                  className="p-2 text-gray-600"
                  aria-label="Close menu"
                >
                  <RiCloseLine className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-lg font-medium rounded-lg ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setMenuVisible(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {token ? (
                <div className="p-4 border-t">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setMenuVisible(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setMenuVisible(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuVisible(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="p-4 border-t">
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-lg font-medium text-primary hover:bg-primary/10 rounded-lg"
                    onClick={() => setMenuVisible(false)}
                  >
                    Login / Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
