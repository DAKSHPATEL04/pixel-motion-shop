import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  Heart,
  Share2, 
  Truck,
  RefreshCcw, 
  Info,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from '@/components/products/ProductCard';
import MainLayout from '@/components/layout/MainLayout';
import { useCart } from '@/contexts/CartContext';

// Dummy product data
const product = {
  id: '1',
  name: 'Galaxy Desk Pad',
  price: 29.99,
  images: Array(4).fill('/placeholder.svg'),
  videos: [],
  description: 'The Galaxy Desk Pad provides a premium surface for your desk setup, featuring a stunning cosmic design with vibrant colors and smooth texture.',
  details: [
    'Premium microfiber surface',
    'Non-slip rubber base',
    'Water-resistant coating',
    'Stitched edges for durability',
    'Dimensions: 900mm x 400mm x 4mm'
  ],
  inStock: true,
  rating: 4.8,
  reviewCount: 124,
  category: 'mousepads',
  relatedProducts: [
    {
      id: '2',
      name: 'Nebula Gaming Pad XL',
      price: 39.99,
      image: '/placeholder.svg',
      category: 'mousepads',
      rating: 4.7,
    },
    {
      id: '3',
      name: 'Minimalist Workspace Poster',
      price: 24.99,
      image: '/placeholder.svg',
      category: 'posters',
      rating: 4.8,
    },
    {
      id: '4',
      name: 'RGB Dreams Poster',
      price: 29.99,
      image: '/placeholder.svg',
      category: 'posters',
      rating: 4.9,
    }
  ]
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // In a real app, we would fetch the product based on ID
  // const { data: product, isLoading, error } = useQuery(['product', id], fetchProduct);
  
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category
    }, quantity);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <MainLayout>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted overflow-hidden rounded-lg">
              {/* Main Image */}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Video play button - would be shown if the selected media is a video */}
              {product.videos && product.videos.length > selectedImage && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80"
                >
                  <Play className="h-10 w-10" />
                </Button>
              )}
              
              {/* Navigation arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer flex-shrink-0 w-20 h-20 overflow-hidden rounded-md border-2 ${
                    selectedImage === index
                      ? "border-accent"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
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
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">{product.description}</p>
              
              <div className="space-y-2">
                <div className="font-semibold">Features:</div>
                <ul className="list-disc pl-5 space-y-1">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-sm">{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </div>
              
              <div className="flex-1">
                <Button className="w-full" size="lg" onClick={handleAddToCart}>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="border-t border-b py-4 space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span>Free shipping on orders over $50</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <RefreshCcw className="h-5 w-5 text-muted-foreground" />
                <span>30-day returns policy</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Info className="h-5 w-5 text-muted-foreground" />
                <span>In stock: Ready to ship</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none mb-4 bg-transparent">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <div className="prose max-w-none">
                <h3>Product Details</h3>
                <p>
                  The Galaxy Desk Pad is designed to transform your workspace with its stunning cosmic design. 
                  The premium microfiber surface provides a smooth and consistent glide for your mouse, while the
                  non-slip rubber base ensures the pad stays firmly in place during intense gaming sessions or
                  productive work days.
                </p>
                <p>
                  Each pad is crafted with precision stitched edges to prevent fraying and ensure longevity.
                  The water-resistant coating protects against accidental spills, making it easy to clean and
                  maintain your desk pad in pristine condition.
                </p>
                <h3>Perfect For</h3>
                <ul>
                  <li>Gamers looking for precision and control</li>
                  <li>Professionals seeking a stylish and functional workspace</li>
                  <li>Anyone wanting to add a touch of personality to their setup</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Product Specifications</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Dimensions", value: "900mm x 400mm x 4mm" },
                      { name: "Material", value: "Microfiber surface, rubber base" },
                      { name: "Edges", value: "Anti-fray stitched" },
                      { name: "Base", value: "Non-slip rubber" },
                      { name: "Water Resistant", value: "Yes" },
                    ].map((spec) => (
                      <div key={spec.name} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{spec.name}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">In The Box</h3>
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>1x Galaxy Desk Pad</li>
                      <li>1x Care Guide</li>
                      <li>1x Microfiber Cleaning Cloth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-5xl font-bold">{product.rating}</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
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
                      <div className="text-sm text-muted-foreground">Based on {product.reviewCount} reviews</div>
                    </div>
                    
                    <div className="flex-1 max-w-md">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="w-8">{rating} ★</div>
                          <div className="flex-1 bg-gray-200 h-2 rounded-full">
                            <div
                              className="bg-amber-400 h-2 rounded-full"
                              style={{
                                width: `${
                                  rating === 5
                                    ? "70%"
                                    : rating === 4
                                    ? "20%"
                                    : rating === 3
                                    ? "5%"
                                    : rating === 2
                                    ? "3%"
                                    : "2%"
                                }`,
                              }}
                            />
                          </div>
                          <div className="w-10 text-xs text-muted-foreground">
                            {rating === 5
                              ? "70%"
                              : rating === 4
                              ? "20%"
                              : rating === 3
                              ? "5%"
                              : rating === 2
                              ? "3%"
                              : "2%"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-bold">Top Reviews</h3>
                  
                  {[
                    {
                      name: "Alex Johnson",
                      date: "March 15, 2023",
                      rating: 5,
                      text: "The Galaxy Desk Pad exceeded my expectations! The design is even more vibrant in person, and the quality is outstanding. My mouse glides perfectly on the surface, and it hasn't budged from my desk once. Highly recommended!",
                    },
                    {
                      name: "Sarah Zhang",
                      date: "February 28, 2023",
                      rating: 5,
                      text: "This desk pad completely transformed my workspace. The size is perfect for my keyboard and mouse, and the cosmic design adds so much personality to my desk. It's also remarkably easy to clean.",
                    },
                    {
                      name: "Marcus Reed",
                      date: "January 12, 2023",
                      rating: 4,
                      text: "Great desk pad with a stunning design. The only reason I'm giving it 4 stars instead of 5 is that it took a few days to lay completely flat. Once it settled though, it's been perfect.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
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
                        </div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <p className="mt-2">{review.text}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-6">
                <Accordion type="single" collapsible defaultValue="shipping">
                  <AccordionItem value="shipping">
                    <AccordionTrigger>Shipping Information</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-4">
                        We offer the following shipping options for all orders:
                      </p>
                      <ul className="space-y-2">
                        <li>Standard Shipping: 5-7 business days (Free on orders over $50)</li>
                        <li>Express Shipping: 2-3 business days ($9.99)</li>
                        <li>Next Day Delivery: Next business day ($14.99)</li>
                      </ul>
                      <p className="mt-4">
                        Please note that delivery times may vary based on your location. All shipping 
                        times are estimates and are not guaranteed.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="returns">
                    <AccordionTrigger>Returns & Refunds</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-4">
                        We offer a 30-day return policy for all our products. To be eligible for a return:
                      </p>
                      <ul className="space-y-2">
                        <li>The product must be in its original condition</li>
                        <li>The product must be unused and in its original packaging</li>
                        <li>You must have the receipt or proof of purchase</li>
                      </ul>
                      <p className="mt-4">
                        Once your return is received and inspected, we will send you an email to
                        notify you that we have received your returned item. We will also notify
                        you of the approval or rejection of your refund.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
