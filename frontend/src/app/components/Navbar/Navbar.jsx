"use client"

import NavLinks from './NavLinks';
import ProfileDropdown from './ProfileDropdown';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-semibold">
        <a href="/">MyApp</a>
      </div>

      {/* Navigation Links */}
      <NavLinks />

      {/* Profile Icon and Dropdown */}
      <div className="relative">
        <button onClick={toggleProfileDropdown} className="focus:outline-none">
          <FaUser/>
        </button>
        
        {isProfileOpen && <ProfileDropdown />}
      </div>
    </nav>
  );
}
