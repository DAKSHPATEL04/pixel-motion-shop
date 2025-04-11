
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import MainLayout from '@/components/layout/MainLayout';

// Dummy cart items
const initialCartItems = [
  {
    id: '1',
    name: 'Galaxy Desk Pad',
    price: 29.99,
    quantity: 1,
    image: '/placeholder.svg',
    category: 'mousepads',
  },
  {
    id: '2',
    name: 'Nebula Gaming Pad XL',
    price: 39.99,
    quantity: 2,
    image: '/placeholder.svg',
    category: 'mousepads',
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const applyPromoCode = () => {
    if (!promoCode) return;
    // In a real app, we would validate the promo code on the server
    console.log('Applying promo code:', promoCode);
    alert('Promo code applied!');
  };
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex py-4 border-t">
                      <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">
                              <Link to={`/products/${item.id}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground capitalize">
                              {item.category}
                            </p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-2"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to="/products">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                  <Button onClick={() => setCartItems([])}>Clear Cart</Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Cart Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button onClick={applyPromoCode}>Apply</Button>
                    </div>
                    {shipping > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Free shipping on orders over $50
                      </p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/checkout" className="w-full">
                    <Button className="w-full">
                      Proceed to Checkout
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-3xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
