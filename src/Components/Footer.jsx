import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaCube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => (
    <footer
        className="bg-[var(--color-section-bg)] border-t border-[var(--color-divider)] py-12 px-4 font-inter"
        style={{ fontFamily: "var(--font-inter)" }}
    >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
            {/* Logo & Description */}
            <div className="flex-1 min-w-[220px]">
                {/* Logo */}
                    <Link to="/" className=" gap-2 flex text-2xl font-bold tracking-tight text-primary no-underline hover:bg-transparent">
                        <FaCube className="text-primary text-3xl" />
                        <span>CrowdCube</span>
                    </Link>
                <p className="text-[var(--color-text-secondary)] text-base leading-relaxed max-w-xs">
                    Empowering your ideas with the crowd. Join us to fund, support, and grow together.
                </p>
                <div className="flex gap-3 mt-6">
                    <a
                        href="#"
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-accent-purple)] transition-colors text-white rounded-full p-2"
                        aria-label="Facebook"
                    >
                        <FaFacebookF size={18} />
                    </a>
                    <a
                        href="#"
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-accent-green)] transition-colors text-white rounded-full p-2"
                        aria-label="Twitter"
                    >
                        <FaTwitter size={18} />
                    </a>
                    <a
                        href="#"
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-accent-yellow)] transition-colors text-white rounded-full p-2"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedinIn size={18} />
                    </a>
                    <a
                        href="#"
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-accent-red)] transition-colors text-white rounded-full p-2"
                        aria-label="Instagram"
                    >
                        <FaInstagram size={18} />
                    </a>
                </div>
            </div>

            {/* Links */}
            <div className="flex flex-1 flex-wrap gap-10 justify-between">
                <div>
                    <h3 className="footer-title text-[var(--color-text-primary)] font-semibold text-lg mb-3 tracking-wide">Services</h3>
                    <ul className="space-y-2">
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Branding</a>
                        </li>
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Design</a>
                        </li>
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Marketing</a>
                        </li>
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Advertisement</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="footer-title text-[var(--color-text-primary)] font-semibold text-lg mb-3 tracking-wide">Company</h3>
                    <ul className="space-y-2">
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">About us</a>
                        </li>
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Contact</a>
                        </li>
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Jobs</a>
                        </li>
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Press kit</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="footer-title text-[var(--color-text-primary)] font-semibold text-lg mb-3 tracking-wide">Legal</h3>
                    <ul className="space-y-2">
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Terms of use</a>
                        </li>
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Privacy policy</a>
                        </li>
                        <li>
                            <a className="link link-hover text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Cookie policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="mt-12 border-t border-[var(--color-divider)] pt-6 text-center text-sm text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} CrowdCube. All rights reserved.
        </div>
    </footer>
);

export default Footer;