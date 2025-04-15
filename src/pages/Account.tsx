
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserRound, 
  Package, 
  Heart, 
  LogOut, 
  Settings, 
  ShoppingBag, 
  CreditCard, 
  Bell,
  MapPin,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { Separator } from "@/components/ui/separator";

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const { toast } = useToast();
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <MainLayout>
      <div className="container max-w-6xl py-8 md:py-12 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground mt-1">Manage your account details and preferences</p>
          </div>
          <Button variant="outline" className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
        </div>
        
        <Card className="mb-8 overflow-hidden border-none shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-primary/10 opacity-50 z-0"></div>
          <CardHeader className="pb-3 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="bg-muted h-20 w-20 rounded-full flex items-center justify-center shadow-md border-2 border-background">
                <UserRound size={40} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl">{user.name}</CardTitle>
                <CardDescription className="mt-1 text-base">{user.email}</CardDescription>
                <p className="text-xs text-muted-foreground mt-1">Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6 w-full md:w-auto grid grid-cols-3 md:inline-flex gap-1">
            <TabsTrigger value="orders" className="flex gap-2 items-center">
              <ShoppingBag size={16} />
              <span className="hidden md:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex gap-2 items-center">
              <Heart size={16} />
              <span className="hidden md:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-2 items-center">
              <Settings size={16} />
              <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-0 space-y-6">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <Package className="size-5" />
                  Order History
                </CardTitle>
                <CardDescription>
                  View all your previous orders
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-center py-16 text-muted-foreground">
                  <ShoppingBag className="mx-auto mb-4 size-12 text-muted-foreground/50" />
                  <p className="mb-2">You haven't placed any orders yet.</p>
                  <Button asChild className="mt-4">
                    <Link to="/products">Start Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist" className="mt-0 space-y-6">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="size-5" />
                  Your Wishlist
                </CardTitle>
                <CardDescription>
                  Items you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {wishlistItems.slice(0, 3).map((item) => (
                      <Link 
                        to={`/products/${item.id}`}
                        key={item.id} 
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <Heart className="mx-auto mb-4 size-12 text-muted-foreground/50" />
                    <p className="mb-2">Your wishlist is empty.</p>
                    <Button asChild className="mt-4">
                      <Link to="/products">Discover Products</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              {wishlistItems.length > 0 && (
                <CardFooter className="bg-muted/30 p-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/wishlist">View All Wishlist Items</Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <UserRound className="size-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Shield className="size-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Password</span>
                    <span className="font-medium">••••••••</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Two-factor authentication</span>
                    <span className="text-red-500">Disabled</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Change Password</Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="size-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No shipping addresses saved yet.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Add Address</Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CreditCard className="size-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No payment methods saved yet.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Add Payment Method</Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Bell className="size-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Email notifications</span>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Order updates</span>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-destructive">
                    <LogOut className="size-5" />
                    Sign Out
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Signing out will remove your session from this device.
                  </p>
                  <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
                    Sign Out of Your Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Account;
