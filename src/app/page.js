'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const services = [
    {
      title: 'Electrical & Wiring',
      description: 'Short-circuit fixes, house rewiring, MCB trip diagnostics, and lighting setups by licensed electricians.',
      badge: 'Popular',
      icon: <BoltIcon className="w-6 h-6 text-amber-500" />,
      bgGradient: 'from-amber-500/10 to-transparent',
      price: 'Starting Rs. 299',
    },
    {
      title: 'Plumbing & Sanitary',
      description: 'Pipe leaks, motor pump repairs, bathroom fitting installs, and overhead tank cleaning solutions.',
      badge: 'Fast Dispatch',
      icon: <WaterIcon className="w-6 h-6 text-sky-500" />,
      bgGradient: 'from-sky-500/10 to-transparent',
      price: 'Starting Rs. 349',
    },
    {
      title: 'CCTV & Security',
      description: 'HD/IP surveillance camera setups, NVR configuration, remote phone view setup, and maintenance.',
      badge: 'Commercial & Home',
      icon: <CameraIcon className="w-6 h-6 text-emerald-500" />,
      bgGradient: 'from-emerald-500/10 to-transparent',
      price: 'Starting Rs. 799',
    },
    {
      title: 'Internet & WiFi Support',
      description: 'Fiber line splicing, router range extension, dual-band setup, and commercial LAN cabling.',
      badge: '30-Min Service',
      icon: <WifiIcon className="w-6 h-6 text-indigo-500" />,
      bgGradient: 'from-indigo-500/10 to-transparent',
      price: 'Starting Rs. 399',
    },
    {
      title: 'Laptop & Computer Clinic',
      description: 'Windows/Mac troubleshooting, SSD upgrades, chip-level motherboard repair, and virus cleanups.',
      badge: 'Doorstep Pickup',
      icon: <ComputerIcon className="w-6 h-6 text-violet-500" />,
      bgGradient: 'from-violet-500/10 to-transparent',
      price: 'Starting Rs. 499',
    },
    {
      title: 'Inverter & Solar Power',
      description: 'Battery health checks, solar inverter troubleshooting, backup wiring, and seasonal maintenance.',
      badge: 'Certified',
      icon: <SunIcon className="w-6 h-6 text-orange-500" />,
      bgGradient: 'from-orange-500/10 to-transparent',
      price: 'Starting Rs. 599',
    },
  ];

  const faqs = [
    {
      q: 'How fast will a technician arrive at my doorstep in Phidim?',
      a: 'For emergency electrical and plumbing issues in Phidim Bazar and immediate wards, our verified technicians usually arrive within 30 to 45 minutes.',
    },
    {
      q: 'Are your technicians verified and background-checked?',
      a: 'Yes, 100%. Every technician on Phidim Service undergoes identity verification, local skill evaluation, and customer service assessment before accepting orders.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'You can pay after the service is completed to your satisfaction using Cash on Delivery, eSewa, Khalti, or mobile banking.',
    },
    {
      q: 'Do you offer service outside Phidim Bazar?',
      a: 'Yes, we also serve surrounding areas in Panchthar including Ranke, Yasok, and Hilihang with prior appointment scheduling.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 selection:bg-[#063B00] selection:text-white antialiased font-sans">
      
      {/* =========================================================================
          1. TOP NOTIFICATION BAR
         ========================================================================= */}
      <div className="bg-[#042400] text-emerald-100 text-xs py-2.5 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Now serving all 14 wards of Phidim Municipality & surrounding Panchthar areas.</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <a href="tel:+9779800000000" className="font-semibold text-emerald-300 hover:underline hidden sm:inline-flex items-center gap-1">
          <span>Call Helpline: +977 9800000000</span>
        </a>
      </div>

      {/* =========================================================================
          2. NAVIGATION BAR
         ========================================================================= */}
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
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Panchthar, Nepal</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#services" className="hover:text-[#063B00] transition-colors">Services</Link>
            <Link href="#how-it-works" className="hover:text-[#063B00] transition-colors">How It Works</Link>
            <Link href="#why-us" className="hover:text-[#063B00] transition-colors">Why Choose Us</Link>
            <Link href="#faq" className="hover:text-[#063B00] transition-colors">FAQ</Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-[#063B00] px-4 py-2.5 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-[#063B00] hover:bg-[#084f00] text-white text-sm font-semibold py-2.5 px-5 rounded-xl shadow-lg shadow-[#063B00]/20 hover:shadow-xl hover:shadow-[#063B00]/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Book a Service
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
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
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#063B00] rounded-xl shadow-md"
              >
                Book a Technician Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          3. HERO SECTION WITH DYNAMIC DISPATCH CARD
         ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-[#F2F8F0] via-white to-white">
        {/* Soft Background Grid Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-tr from-emerald-200/30 via-emerald-100/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#063B00] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>Panchthar's #1 On-Demand Technical Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                Quick, Reliable Repairs at Your Doorstep in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#063B00] to-emerald-600">
                  Phidim.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                No more chasing down electricians or waiting days for a plumber. Phidim Service dispatches certified local technicians straight to your home, shop, or office in under 45 minutes.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                <Link
                  href="/register"
                  className="bg-[#063B00] hover:bg-[#084f00] text-white text-base font-bold py-3.5 px-8 rounded-xl shadow-xl shadow-[#063B00]/25 transition-all duration-200 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                >
                  <span>Book a Technician</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="bg-white hover:bg-slate-50 text-[#063B00] font-bold py-3.5 px-7 rounded-xl border-2 border-emerald-900/15 shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-center"
                >
                  Join as Technician
                </Link>
              </div>

              {/* Quick Metrics Bar */}
              <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">45<span className="text-emerald-600">m</span></div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Average Arrival Time</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">4.9<span className="text-amber-500">★</span></div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">1,200+ Reviews</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">100<span className="text-emerald-600">%</span></div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Upfront Pricing</p>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Dispatch Card Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-emerald-950/10 border border-emerald-100 relative">
                
                {/* Status Indicator Bar */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Technicians Active</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                    Phidim Bazar
                  </span>
                </div>

                {/* Simulated Technician Dispatch */}
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#063B00] text-white flex items-center justify-center font-bold text-lg shadow-md">
                      ST
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">Subash Thapa</h4>
                        <VerifiedBadgeIcon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Certified Electrician & Wiring Pro</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Dispatched to Ward 1</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">ETA: 14 mins</span>
                  </div>
                </div>

                {/* Fast Service Selection Quick-Tabs */}
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3">Popular Right Now</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-center gap-2">
                      <BoltIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-xs font-medium text-slate-700">MCB Tripping Fix</span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-center gap-2">
                      <WaterIcon className="w-4 h-4 text-sky-500 flex-shrink-0" />
                      <span className="text-xs font-medium text-slate-700">Motor Pump Repair</span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-center gap-2">
                      <CameraIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs font-medium text-slate-700">CCTV Setup</span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-center gap-2">
                      <WifiIcon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span className="text-xs font-medium text-slate-700">Fiber Splicing</span>
                    </div>
                  </div>
                </div>

                {/* Fast Call-to-Book */}
                <Link
                  href="/register"
                  className="mt-6 w-full py-3 bg-slate-900 hover:bg-[#063B00] text-white rounded-xl text-xs font-bold text-center block transition-colors shadow-md"
                >
                  Request Immediate Technician →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW IT WORKS (3 SIMPLE STEPS)
         ========================================================================= */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              How Phidim Service Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Book doorstep repair services in less than two minutes with complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-[#FDFDFD] p-8 rounded-2xl border border-slate-100 shadow-sm relative">
              <span className="text-4xl font-black text-slate-200 absolute top-6 right-6">01</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#063B00] flex items-center justify-center font-bold text-lg mb-6">
                <ClipboardIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Request Service</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Choose your problem, enter your location in Phidim, and pick a convenient time slot.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FDFDFD] p-8 rounded-2xl border border-slate-100 shadow-sm relative">
              <span className="text-4xl font-black text-slate-200 absolute top-6 right-6">02</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#063B00] flex items-center justify-center font-bold text-lg mb-6">
                <TruckIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Technician Arrives</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A background-verified technician arrives with diagnostic tools and gives an upfront estimate.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FDFDFD] p-8 rounded-2xl border border-slate-100 shadow-sm relative">
              <span className="text-4xl font-black text-slate-200 absolute top-6 right-6">03</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#063B00] flex items-center justify-center font-bold text-lg mb-6">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pay After Inspection</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Review the completed repair, test everything, and pay securely via Cash, eSewa, or Khalti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SERVICES CATALOG SECTION
         ========================================================================= */}
      <section id="services" className="py-24 bg-[#FAFBF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Full-Spectrum Technical Support
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Professional Services in Phidim
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Expert repairs for homes, retail shops, offices, colleges, and hotels across Panchthar.
              </p>
            </div>
            <Link
              href="/register"
              className="text-sm font-bold text-[#063B00] hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore all services</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#063B00] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{service.price}</span>
                  <Link
                    href="/register"
                    className="text-xs font-bold text-[#063B00] hover:underline flex items-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE US
         ========================================================================= */}
      <section id="why-us" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Built For Phidim
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Why Residents Trust Phidim Service
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              We eliminated the pain points of unpunctual technicians and hidden charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[#063B00] text-white flex items-center justify-center mb-5 shadow-md">
                <ClockFastIcon className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Swift Doorstep Arrival</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Our technicians are stationed across local hubs in Phidim to ensure fast emergency response.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[#063B00] text-white flex items-center justify-center mb-5 shadow-md">
                <BadgeCheckIcon className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Verified Skill Levels</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every service professional is tested for technical expertise and polite customer manners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[#063B00] text-white flex items-center justify-center mb-5 shadow-md">
                <ReceiptIcon className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Transparent Rate Card</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Know what you will pay before work starts. Zero surprise post-repair price inflations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[#063B00] text-white flex items-center justify-center mb-5 shadow-md">
                <WarrantyShieldIcon className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">7-Day Service Guarantee</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                If the same issue reoccurs within a week, our technician revisits and re-inspects free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ========================================================================= */}
      <section id="faq" className="py-24 bg-[#FAFBF9] border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-[#063B00]"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 flex-shrink-0 ${
                      activeFaq === index ? 'rotate-180 text-[#063B00]' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. HIGH-CONVERTING BOTTOM CTA BANNER
         ========================================================================= */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-[#042400] via-[#063B00] to-[#0a4e03] text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl shadow-emerald-950/20">
          <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Have an urgent breakdown in Phidim?
            </h2>
            <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Book online right now or call our local dispatch hotline. A qualified technician will be on the way.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="bg-white hover:bg-emerald-50 text-[#063B00] font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-center text-sm"
              >
                Book Doorstep Visit
              </Link>
              <a
                href="tel:+9779800000000"
                className="bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-500/30 text-white font-bold py-3.5 px-8 rounded-xl transition-all text-center text-sm flex items-center justify-center gap-2"
              >
                <PhoneIcon className="w-4 h-4" />
                <span>+977 9800000000</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. ENTERPRISE FOOTER
         ========================================================================= */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            
            {/* Col 1: Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black text-lg">
                  PS
                </div>
                <span className="text-xl font-bold text-white tracking-wide">Phidim Service</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
                Connecting residents and businesses across Phidim, Panchthar with vetted, skilled professionals for electrical, plumbing, network, and hardware repairs.
              </p>
              <div className="text-xs text-slate-500 space-y-1">
                <p>📍 Phidim Bazar, Ward No. 1, Panchthar, Nepal</p>
                <p>🕒 Mon - Sat: 8:00 AM – 7:00 PM</p>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="#services" className="hover:text-white transition-colors">Electrical Wiring</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Plumbing Fixes</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">CCTV Installation</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">WiFi & Fiber Setup</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">PC Repair Clinic</Link></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="#why-us" className="hover:text-white transition-colors">Why Phidim Service</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Technician Sign Up</Link></li>
                <li><Link href="#faq" className="hover:text-white transition-colors">Support & FAQs</Link></li>
              </ul>
            </div>

            {/* Col 4: Payment Acceptance */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Payment Supported</h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Pay safely after service completion using your preferred option:
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">eSewa</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-purple-400">Khalti</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Cash on Delivery</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-400">Fonepay</span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Phidim Service Platform. Built with pride in Panchthar, Nepal.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ==========================================================================
   Self-Contained Scalable Vector Graphics (Zero npm installs needed)
   ========================================================================== */

function BoltIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function WaterIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  );
}

function CameraIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function WifiIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  );
}

function ComputerIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function SunIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function VerifiedBadgeIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function ClipboardIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function TruckIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V4.875A1.125 1.125 0 0013.125 3.75h-7.5A1.125 1.125 0 004.5 4.875V14.25" />
    </svg>
  );
}

function CheckCircleIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ClockFastIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function BadgeCheckIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  );
}

function ReceiptIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function WarrantyShieldIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z" />
    </svg>
  );
}