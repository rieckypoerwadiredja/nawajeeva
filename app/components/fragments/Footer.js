import React from "react";
import { FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-10">
        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href="#" className="hover:underline transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href="#" className="hover:underline transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Menu */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href="#" className="hover:underline transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline transition">
                Reports
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline transition">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <p className="mb-2 text-white/80">
            <strong>Phone:</strong> +62 811 123 4567
          </p>
          <p className="mb-2 text-white/80">
            <strong>Email:</strong> info@nawajeeva.co.id
          </p>
          <p className="mb-4 text-white/80">
            <strong>Address:</strong> Jl. Raya Tani No. 42, Bogor, Indonesia
          </p>

          {/* Social Media */}
          <div className="flex space-x-4">
            <Link
              href="https://www.instagram.com"
              className="text-white hover:underline transition"
            >
              <FaInstagram size={22} />
            </Link>
            <Link
              href="https://www.whatsapp.com/"
              className="text-white hover:underline transition"
            >
              <FaWhatsapp size={22} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/pt-agrobot-bangun-nusantara/"
              className="text-white hover:underline transition"
            >
              <FaLinkedinIn size={22} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-primary-hover py-4 text-center text-sm text-white/70">
        <p>&copy; {new Date().getFullYear()} NawaJeeva. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
