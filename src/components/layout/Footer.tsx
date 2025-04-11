
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="font-bold text-xl">
              PIXEL<span className="text-accent">MOTION</span>
            </Link>
            <p className="text-sm text-gray-300 max-w-xs">
              Premium mousepads and posters designed for gamers, creators, and style enthusiasts.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Button variant="ghost" size="icon">
                  <Instagram size={20} />
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <Button variant="ghost" size="icon">
                  <Twitter size={20} />
                </Button>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Button variant="ghost" size="icon">
                  <Youtube size={20} />
                </Button>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Button variant="ghost" size="icon">
                  <Facebook size={20} />
                </Button>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-base mb-4">Shop</h4>
            <ul className="space-y-2">
              {['All Products', 'Mousepads', 'Posters', 'New Arrivals', 'Best Sellers', 'Special Offers'].map((item) => (
                <li key={item}>
                  <Link to={`/products${item === 'All Products' ? '' : `/category/${item.toLowerCase().replace(' ', '-')}`}`} className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-base mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {['Contact Us', 'FAQs', 'Shipping Policy', 'Returns & Refunds', 'Track Order', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-base mb-4">Sign up for our newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">
              Get early access to new products and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-secondary/20 border-0 focus-visible:ring-accent"
              />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} PixelMotion. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms-of-service" className="hover:text-accent transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="hover:text-accent transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
