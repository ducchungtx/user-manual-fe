"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const baseClass = "hover:underline me-4 md:me-6";
    return `${baseClass} ${pathname === path ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`;
  };

  return (
    <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <Link href="/about" className={getLinkClass('/about')}>About</Link>
          </li>
          <li>
            <Link href="/privacy-policy" className={getLinkClass('/privacy-policy')}>Privacy Policy</Link>
          </li>
          <li>
            <Link href="/licensing" className={getLinkClass('/licensing')}>Licensing</Link>
          </li>
          <li>
            <Link href="/contact" className={`${getLinkClass('/contact')} me-0`}>Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
