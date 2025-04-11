
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
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
  {
    id: '6',
    name: 'Retro Gaming Poster',
    price: 22.99,
    image: '/placeholder.svg',
    video: '',
    category: 'posters',
    rating: 4.7,
  },
  {
    id: '7',
    name: 'Mechanical Keyboard Poster',
    price: 24.99,
    image: '/placeholder.svg',
    video: '',
    category: 'posters',
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Stealth Gaming Pad',
    price: 32.99,
    image: '/placeholder.svg',
    video: '',
    category: 'mousepads',
    rating: 4.9,
  },
];

const Products: React.FC = () => {
  const [products, setProducts] = useState(allProducts);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filtered);
  };
  
  const handleSort = (value: string) => {
    setSortBy(value);
    let sortedProducts = [...products];
    
    switch (value) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured - keep original order
        sortedProducts = [...allProducts];
    }
    
    setProducts(sortedProducts);
  };
  
  const filterByCategory = (category: string) => {
    if (category === 'all') {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => product.category === category);
      setProducts(filtered);
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center">
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center border rounded-md">
              <Button
                variant={view === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={() => setView('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={() => setView('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <SlidersHorizontal className="mr-2 h-5 w-5" />
                  Filter Products
                </h3>
                
                <Separator className="my-4" />
                
                <div className="space-y-5">
                  <div>
                    <h4 className="font-medium mb-2">Categories</h4>
                    <div className="space-y-2">
                      {['all', 'mousepads', 'posters'].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            onCheckedChange={() => {
                              filterByCategory(category);
                            }}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm capitalize"
                          >
                            {category === 'all' ? 'All Products' : category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Min"
                        className="h-8"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-2">
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button>Apply Filters</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Product Grid */}
        {products.length > 0 ? (
          <div className={
            view === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-6"
          }>
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                listView={view === 'list'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Products;
