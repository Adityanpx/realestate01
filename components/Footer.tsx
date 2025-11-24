'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-card border-t border-border text-foreground py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">WHICHFLOOR</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your trusted partner in finding the best commercial real estate and coworking spaces across India with AI-powered matching.
            </p>
            <div className="flex flex-col space-y-3">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground hover:text-foreground transition-colors">
                  <a href="tel:+919039572226">+91 9039572226</a>
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Mumbai, Bangalore, Delhi NCR</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-400">Services</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/properties?category=lease_commercial&subcategory=office_commercial" className="hover:text-foreground transition-colors duration-300">Office/Commercial</Link></li>
              <li><Link href="/properties?category=lease_commercial&subcategory=coworking" className="hover:text-foreground transition-colors duration-300">Co-working</Link></li>
              <li><Link href="/properties?category=lease_commercial&subcategory=managed_office" className="hover:text-foreground transition-colors duration-300">Managed Office</Link></li>
              <li><Link href="/properties?category=buy_commercial&subcategory=offices" className="hover:text-foreground transition-colors duration-300">Offices</Link></li>
              <li><Link href="/properties?category=buy_commercial&subcategory=commercial_projects" className="hover:text-foreground transition-colors duration-300">Commercial Projects</Link></li>
              <li><Link href="/properties?category=preleased&subcategory=showroom" className="hover:text-foreground transition-colors duration-300">Showroom</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-400">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors duration-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors duration-300">Contact Us</Link></li>
              <li><Link href="/blogs" className="hover:text-foreground transition-colors duration-300">Blogs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-400">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="tel:+919039572226" className="hover:text-foreground transition-colors duration-300">+91 9039572226</a></li>
              <li><a href="mailto:info@whichfloor.in" className="hover:text-foreground transition-colors duration-300">info@whichfloor.in</a></li>
            </ul>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <div className="border-t border-border pt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">Stay updated with market insights</h3>
              <p className="text-muted-foreground">
                Get the latest property market trends, investment tips, and exclusive deals delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 px-4 py-3 bg-accent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div 
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">© 2025 Whichfloor. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link href="/faqs" className="text-muted-foreground hover:text-primary transition-colors">Support</Link>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            {[
              { icon: Facebook, href: 'https://facebook.com/whichfloor' },
              { icon: Twitter, href: 'https://twitter.com/whichfloor' },
              { icon: Instagram, href: 'https://instagram.com/whichfloor' },
              { icon: Linkedin, href: 'https://linkedin.com/company/whichfloor' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;