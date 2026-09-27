'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from "@/hooks/useAuth";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, isAuthenticated } = useAuth();

  return (
    <div>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-tr from-[#063B00] to-[#0f6805] text-white rounded-xl flex items-center justify-center text-xl font-black shadow-md shadow-[#063B00]/20 group-hover:scale-105 transition-transform duration-200">
              PS
            </div>

            <div>
              <span className="text-xl font-extrabold text-[#063B00] tracking-tight block leading-none">
                Phidim<span className="text-emerald-600 font-bold">Service</span>
              </span>

              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Panchthar, Nepal
              </span>
            </div>
          </Link>


          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#services" className="hover:text-[#063B00] transition-colors">
              Services
            </Link>

            <Link href="#how-it-works" className="hover:text-[#063B00] transition-colors">
              How It Works
            </Link>

            <Link href="#why-us" className="hover:text-[#063B00] transition-colors">
              Why Choose Us
            </Link>

            <Link href="#faq" className="hover:text-[#063B00] transition-colors">
              FAQ
            </Link>
          </nav>


          {/* CTA */}
<div className="hidden sm:flex items-center gap-3">

  {!loading && isAuthenticated && user ? (

    <Link
      href="/profile"
      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#063B00] px-4 py-2.5 rounded-lg transition-colors"
    >
      <div className="w-9 h-9 rounded-full bg-[#063B00] text-white flex items-center justify-center font-bold">
        {user.first_name?.charAt(0)}
      </div>

      <span>
        {user.first_name}
      </span>

    </Link>

  ) : (

    <Link
      href="/login"
      className="text-sm font-semibold text-slate-700 hover:text-[#063B00] px-4 py-2.5 rounded-lg transition-colors"
    >
      Sign In
    </Link>

  )}


  <Link
    href="/register"
    className="bg-[#063B00] hover:bg-[#084f00] text-white text-sm font-semibold py-2.5 px-5 rounded-xl shadow-lg shadow-[#063B00]/20 hover:shadow-xl transition-all"
  >
    Book a Service
  </Link>

</div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>

        </div>


        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">

            <Link
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 hover:text-[#063B00]"
            >
              Services
            </Link>

            <Link
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 hover:text-[#063B00]"
            >
              How It Works
            </Link>

            <Link
              href="#why-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 hover:text-[#063B00]"
            >
              Why Choose Us
            </Link>

            <Link
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 hover:text-[#063B00]"
            >
              FAQ
            </Link>


            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">

              <Link
                href="/login"
                className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#063B00] rounded-xl"
              >
                Book a Technician Now
              </Link>

            </div>

          </div>
        )}

      </header>
    </div>
  );
};

export default Navbar;