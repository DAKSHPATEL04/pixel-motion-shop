
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  ShoppingBag, 
  Heart, 
  Trash2, 
  ArrowLeft 
} from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-6xl py-8 md:py-12 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Heart className="text-primary" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground mt-1">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/products" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </Button>
            {wishlistItems.length > 0 && (
              <Button 
                variant="outline" 
                className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={clearWishlist}
              >
                <Trash2 size={16} />
                Clear All
              </Button>
            )}
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card 
                key={item.id}
                className="overflow-hidden border-0 shadow-md group transition-all hover:shadow-lg"
              >
                <Link to={`/products/${item.id}`} className="block aspect-square relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </Link>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/products/${item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <p className="text-muted-foreground text-sm capitalize">{item.category}</p>
                      </div>
                      <div className="font-bold">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                    
                    {item.rating && (
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.rating!) 
                                  ? "text-amber-400 fill-amber-400" 
                                  : "text-gray-200 fill-gray-200"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs ml-1 text-muted-foreground">{item.rating}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button 
                    className="flex-1" 
                    variant="default" 
                    onClick={() => handleMoveToCart(item)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-muted/40 inline-flex rounded-full p-6 mb-6">
              <Heart className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Products added to your wishlist will appear here. Start browsing to find products you like.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Wishlist;
