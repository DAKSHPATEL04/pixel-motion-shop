
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  image: string;
  video?: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/products/category/${category.id}`}
      className="block"
    >
      <Card 
        className="overflow-hidden border-0 shadow-md hover-lift relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square relative overflow-hidden">
          {/* Category Image/Video */}
          {category.video && isHovered ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={category.video} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={category.image} 
              alt={category.name} 
              className={cn(
                "w-full h-full object-cover transition-transform duration-500",
                isHovered && "scale-110"
              )} 
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <CardContent className="p-6 text-white">
              <h3 className="text-2xl font-bold">{category.name}</h3>
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
