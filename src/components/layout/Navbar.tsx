
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  
  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Mousepads', path: '/products/category/mousepads' },
    { name: 'Posters', path: '/products/category/posters' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const NavItems = () => (
    <ul className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            className="text-base md:text-sm font-medium hover:text-accent transition-colors duration-200"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl md:text-2xl">
          PIXEL<span className="text-accent">MOTION</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:block">
            <NavItems />
          </nav>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart size={20} />
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            </Button>
          </Link>
          
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </Link>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <Link to="/" className="font-bold text-xl">
                      PIXEL<span className="text-accent">MOTION</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col py-8">
                    <NavItems />
                  </nav>
                  <div className="mt-auto pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <Link to="/login">
                        <Button variant="outline">Log in</Button>
                      </Link>
                      <Link to="/register">
                        <Button>Sign up</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
