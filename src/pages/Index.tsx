
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/products/ProductCard';
import CategoryCard from '@/components/products/CategoryCard';
import MainLayout from '@/components/layout/MainLayout';

const featuredProducts = [
  {
    id: '1',
    name: 'Galaxy Desk Pad',
    price: 29.99,
    image: '/placeholder.svg',
    video: '', // Would be a video URL in real implementation
    category: 'mousepads',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Nebula Gaming Pad XL',
    price: 39.99,
    image: '/placeholder.svg',
    video: '', // Would be a video URL in real implementation
    category: 'mousepads',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Minimalist Workspace Poster',
    price: 24.99,
    image: '/placeholder.svg',
    video: '', // Would be a video URL in real implementation
    category: 'posters',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'RGB Dreams Poster',
    price: 29.99,
    image: '/placeholder.svg',
    video: '', // Would be a video URL in real implementation
    category: 'posters',
    rating: 4.9,
  },
];

const categories = [
  {
    id: 'gaming-mousepads',
    name: 'Gaming Mousepads',
    image: '/placeholder.svg',
    video: '', // Would be a video URL in real implementation
  },
  {
    id: 'desk-pads',
    name: 'Desk Pads',
    image: '/placeholder.svg',
    video: '', // Would be a video URL in real implementation
  },
  {
    id: 'gaming-posters',
    name: 'Gaming Posters',
    image: '/placeholder.svg',
    video: '', // Would be a video URL in real implementation
  },
  {
    id: 'minimalist-posters',
    name: 'Minimalist Posters',
    image: '/placeholder.svg',
    video: '', // Would be a video URL in real implementation
  },
];

const Index: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // In a real implementation, we would load the video dynamically
    // videoRef.current?.play();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video would be replaced with actual video in real implementation */}
        <div className="absolute inset-0 bg-black/70">
          {/* Placeholder for video - in real implementation this would be: */}
          {/* <video 
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video> */}
        </div>
        
        <div className="container relative z-10 text-white text-center">
          <h1 className="animate-fade-in">
            Elevate Your <span className="text-accent">Setup</span>
          </h1>
          <p className="mt-4 mb-8 max-w-lg mx-auto text-lg md:text-xl font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Premium mousepads and posters designed for gamers, creators, and style enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/products/category/mousepads">
              <Button size="lg" className="btn-hover-effect">
                Shop Mousepads
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/products/category/posters">
              <Button variant="outline" size="lg" className="btn-hover-effect text-white border-white hover:bg-white/10">
                Explore Posters
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-2">Our best-selling products</p>
            </div>
            <Link to="/products" className="group flex items-center text-accent font-semibold hover:underline mt-4 md:mt-0">
              View all products
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Why Choose PixelMotion</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              We're obsessed with creating products that enhance your experience and elevate your setup.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Premium Quality',
                description: 'High-quality materials for durability and comfort that lasts for years.',
                icon: '🌟'
              },
              {
                title: 'Unique Designs',
                description: 'Exclusive patterns and artwork you won't find anywhere else.',
                icon: '🎨'
              },
              {
                title: 'Performance Focused',
                description: 'Engineered for precision, speed, and control for gaming and work.',
                icon: '🚀'
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Johnson',
                role: 'Professional Gamer',
                content: 'The quality of these mousepads is incredible. The smooth surface gives me perfect precision for competitive gaming.',
              },
              {
                name: 'Sarah Zhang',
                role: 'Graphic Designer',
                content: 'I love my desk pad! It's spacious, comfortable, and the design adds so much personality to my workspace.',
              },
              {
                name: 'Marcus Reed',
                role: 'Content Creator',
                content: 'The posters look even better in person. High quality print that really makes my streaming setup stand out.',
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mb-4">{testimonial.content}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-8">
              Subscribe to get exclusive updates, early access to new collections, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
              />
              <Button variant="secondary" className="bg-white text-accent hover:bg-white/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
