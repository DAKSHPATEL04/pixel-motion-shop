
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';
import MainLayout from '@/components/layout/MainLayout';

const allProducts = [
  {
    id: '1',
    name: 'Galaxy Desk Pad',
    price: 29.99,
    image: '/placeholder.svg',
    video: '',
    category: 'mousepads',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Nebula Gaming Pad XL',
    price: 39.99,
    image: '/placeholder.svg',
    video: '',
    category: 'mousepads',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Minimalist Workspace Poster',
    price: 24.99,
    image: '/placeholder.svg',
    video: '',
    category: 'posters',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'RGB Dreams Poster',
    price: 29.99,
    image: '/placeholder.svg',
    video: '',
    category: 'posters',
    rating: 4.9,
  },
  {
    id: '5',
    name: 'Cosmic Explorer Mousepad',
    price: 34.99,
    image: '/placeholder.svg',
    video: '',
    category: 'mousepads',
    rating: 4.6,
  },
];

const ProductCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<typeof allProducts>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Filter products by category
    setLoading(true);
    const filtered = allProducts.filter(
      product => product.category === category
    );
    setProducts(filtered);
    setLoading(false);
  }, [category]);
  
  const categoryTitle = {
    mousepads: 'Gaming & Desk Mousepads',
    posters: 'Premium Wall Posters',
  }[category || ''] || 'Products';
  
  const categoryDescription = {
    mousepads: 'High-quality mousepads designed for gamers and professionals. Enhance your gaming experience or make your workspace more comfortable.',
    posters: 'Premium wall posters to elevate your gaming setup or workspace. Unique designs that make a statement.',
  }[category || ''] || '';
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-12 text-center">
          <p>Loading products...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="mb-8">
          <Link to="/products">
            <Button variant="ghost" className="pl-0 mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all products
            </Button>
          </Link>
          
          <div className="relative overflow-hidden rounded-lg mb-6">
            {/* This would be a video/image banner in production */}
            <div className="bg-gradient-to-r from-primary/90 to-primary/40 h-48 flex items-end">
              <div className="container p-6">
                <h1 className="text-4xl font-bold text-white">{categoryTitle}</h1>
                <p className="text-white/80 mt-2 max-w-2xl">{categoryDescription}</p>
              </div>
            </div>
          </div>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
            <Link to="/products" className="mt-4 inline-block">
              <Button>View All Products</Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductCategory;
