
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  video?: string;
  category: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden border-0 shadow-md product-card-hover relative group",
        isHovered && "shadow-xl"
      )} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block aspect-square relative overflow-hidden">
        {/* Product Image/Video */}
        {product.video && isHovered ? (
          // Video would replace image on hover if available
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={product.video} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={product.image} 
            alt={product.name} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              isHovered && "scale-110"
            )} 
          />
        )}
        
        {/* Wishlist Button */}
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/80 hover:bg-white"
        >
          <Heart size={18} />
        </Button>
      </Link>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <Link to={`/products/${product.id}`} className="font-medium hover:underline">
                {product.name}
              </Link>
              <p className="text-muted-foreground text-sm capitalize">{product.category}</p>
            </div>
            <div className="font-bold">
              ${product.price.toFixed(2)}
            </div>
          </div>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating!) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs ml-1 text-muted-foreground">{product.rating}</span>
            </div>
          )}
          
          {/* Add to Cart Button */}
          <Button className="w-full mt-2" variant="outline">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
