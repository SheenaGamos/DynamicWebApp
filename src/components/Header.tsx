'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for managing mobile menu visibility

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState); // Toggle the state of the mobile menu
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Hide header on /login or /register
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return null;
  }

  return (
    <header className="fixed bottom-0 left-0 w-full bg-transparent backdrop-blur-md z-10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center space-x-6">
        {/* Logo or Brand Name */}
        <Link href="/" className="text-2xl font-semibold text-white hover:text-blue-600">
          MyApp
        </Link>

        {/* Navigation Links (with conditional display) */}
        <div className="hidden md:flex space-x-6">
          {pathname === '/myposts' ? (
            // Show only logout if on /myposts
            user && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium"
                aria-label="Logout"
              >
                Logout
              </button>
            )
          ) : (
            // Show full header on other pages (including /posts)
            <>
              <Link href="/" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Home">
                Home
              </Link>
              <Link href="/users" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Users">
                Users
              </Link>
              <Link href="/posts" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Posts">
                Posts
              </Link>
              <Link href="/chart" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Dashboard">
                Dashboard
              </Link>
              <Link href="/login" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Login">
                Login
              </Link>
              <Link href="/register" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Register">
                Register
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 font-medium"
                  aria-label="Logout"
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu (hidden on larger screens) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-800 text-white space-y-4 py-4">
          <Link href="/" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Home">Home</Link>
          <Link href="/users" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Users">Users</Link>
          <Link href="/posts" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Posts">Posts</Link>
          <Link href="/chart" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Dashboard">Dashboard</Link>
          <Link href="/login" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Login">Login</Link>
          <Link href="/register" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition duration-300" aria-label="Register">Register</Link>
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
