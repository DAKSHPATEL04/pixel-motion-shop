
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();
  
  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);
  
  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  const addToWishlist = (product: WishlistItem) => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isAlreadyInWishlist) {
      toast({
        description: `${product.name} is already in your wishlist.`,
      });
      return;
    }
    
    setWishlistItems(prev => [...prev, product]);
    toast({
      description: `Added ${product.name} to your wishlist.`,
    });
  };
  
  const removeFromWishlist = (id: string) => {
    const itemToRemove = wishlistItems.find(item => item.id === id);
    if (itemToRemove) {
      setWishlistItems(prev => prev.filter(item => item.id !== id));
      toast({
        description: `Removed ${itemToRemove.name} from your wishlist.`,
      });
    }
  };
  
  const isInWishlist = (id: string): boolean => {
    return wishlistItems.some(item => item.id === id);
  };
  
  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      description: "Your wishlist has been cleared.",
    });
  };
  
  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
