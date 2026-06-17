import Link from 'next/link';
import { FaRegCopyright } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-black tracking-wider text-white">
              RESELL<span className="text-neutral-900 bg-yellow-400 px-2 py-1 rounded ml-1">HUB</span>
            </Link>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mt-2">
              <Link href="/about" className="hover:underline">About Us</Link>
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Resell Hub is a modern reselling platform where users can buy and sell pre-owned or used products safely, easily, and at the right price. We believe in a sustainable future and smart shopping.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-l-4 border-yellow-400 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-yellow-400 transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-yellow-400 transition-colors duration-200">All Products</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-yellow-400 transition-colors duration-200">Categories</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-yellow-400 transition-colors duration-200">User Dashboard</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-l-4 border-yellow-400 pl-2">
              <Link href="/contact" className="hover:text-yellow-400 transition-colors duration-200">Contact Us</Link>
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <svg className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Khilgaon, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@resellhub.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-l-4 border-yellow-400 pl-2">
              Social Links
            </h3>
            <p className="text-sm text-gray-400 mb-4">Connect with us on social media:</p>
            <div className="flex space-x-3">
              <a href="#" className="p-2.5 bg-neutral-800 rounded-full text-gray-400 hover:bg-yellow-400 hover:text-neutral-900 transition-all duration-300" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 bg-neutral-800 rounded-full text-gray-400 hover:bg-yellow-400 hover:text-neutral-900 transition-all duration-300" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 bg-neutral-800 rounded-full text-gray-400 hover:bg-yellow-400 hover:text-neutral-900 transition-all duration-300" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p><FaRegCopyright /> {new Date().getFullYear()} Resell Hub. All rights reserved.</p>
          <div className="flex space-x-4 text-xs">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}