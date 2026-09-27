'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
  const router = useRouter()
  const [role, setRole] = useState('c');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [address, setadress] = useState('')
  const [phone_number, setphone_number] = useState('')
  const [password, setpassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');

  const userfirstname = (event) => setfirst_name(event.target.value);
  const userslastname = (event) => setlast_name(event.target.value);
  const usersusername = (event) => setusername(event.target.value);
  const usersemail = (event) => setemail(event.target.value);
  const usersaddress = (event) => setadress(event.target.value);
  const usersphone_number = (event) => setphone_number(event.target.value);
  const userspassword = (event) => setpassword(event.target.value);
  const usersconfirm_password = (event) => setconfirm_password(event.target.value);

  const register = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/user/register/", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            address: address,
            phone_number: phone_number,
            password: password,
            confirm_password: confirm_password,
            role: role, 
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success('User registered successfully!');
        router.push('/login');
      } else {
        toast.error(data.detail || 'Registration failed. Please check your details.');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Left Side: Branding Sidebar */}
      <div className="hidden md:flex md:w-1/2 bg-[#063B00] text-white p-12 lg:p-16 flex-col justify-center">
        <h1 className="font-extrabold text-3xl lg:text-4xl mb-6 tracking-wide">
          Phidim Service For Quick Services
        </h1>
        <p className="text-base lg:text-lg leading-relaxed text-gray-200">
          Phidim Service is a professional local technical service platform based in Phidim, Panchthar, Nepal.
          It connects customers with skilled technicians for electrical, plumbing, CCTV, internet, computer, and other technical services.
          Customers can request convenient doorstep service for homes, shops, offices, hotels, and other locations.
          The platform focuses on quick response, reliable technicians, transparent service, and convenient online booking.
          Phidim Service aims to make professional technical support faster, easier, and more accessible in Phidim and surrounding areas.
        </p>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">Create an Account</h2>
          <p className="text-gray-500 text-center mb-6 text-sm">Join Phidim Service today</p>

          <form className="flex flex-col gap-3">
            
            {/* Role Selection Toggle */}
            <div className="flex flex-col gap-1.5 mb-1">
              <label className="text-xs font-semibold text-gray-700">I am registering as a:</label>
              <div className="flex gap-3">
                <label 
                  className={`flex-1 text-center py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 text-sm font-medium ${
                    role === 'c' 
                      ? 'bg-[#063B00] text-white border-[#063B00] shadow-sm' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#063B00]'
                  }`}
                >
                  <input type="radio" name="role" value="c" checked={role === 'c'} onChange={() => setRole('c')} className="hidden" />
                  Customer
                </label>
                <label 
                  className={`flex-1 text-center py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 text-sm font-medium ${
                    role === 't' 
                      ? 'bg-[#063B00] text-white border-[#063B00] shadow-sm' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#063B00]'
                  }`}
                >
                  <input type="radio" name="role" value="t" checked={role === 't'} onChange={() => setRole('t')} className="hidden" />
                  Technician
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">First Name</label>
                <input type="text" placeholder="ram" value={first_name} onChange={userfirstname} className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] focus:border-transparent transition" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">Last Name</label>
                <input type="text" placeholder="sita" value={last_name} onChange={userslastname} className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] focus:border-transparent transition" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">UserName</label>
              <input type="text" placeholder="johndoe123" value={username} onChange={usersusername} className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] focus:border-transparent transition" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={usersemail} className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] focus:border-transparent transition" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Address</label>
              <input type="text" placeholder="Koshi, Nepal" value={address} onChange={usersaddress} className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] focus:border-transparent transition" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">PhoneNumber</label>
              <input type='text' placeholder="+977 9867......" value={phone_number} onChange={usersphone_number} className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] focus:border-transparent transition" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <input type="password" placeholder="Create password" value={password} onChange={userspassword} className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] focus:border-transparent transition" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">Confirm Password</label>
                <input type="password" placeholder="Confirm password" value={confirm_password} onChange={usersconfirm_password} className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B00] focus:border-transparent transition" />
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer mt-1">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-[#063B00] focus:ring-[#063B00]" />
              <span>I agree to the <a href="#" className="text-[#063B00] hover:underline">Terms of Service</a> and <a href="#" className="text-[#063B00] hover:underline">Privacy Policy</a></span>
            </label>

            <button 
              type="button"
              onClick={register} 
              className="mt-2 w-full bg-[#063B00] hover:bg-[#052f00] text-white font-bold py-2.5 px-4 rounded-lg text-sm transition duration-200 shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#063B00] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;