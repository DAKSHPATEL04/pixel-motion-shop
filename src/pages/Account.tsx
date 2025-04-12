
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
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, Package, Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
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
      <div className="container max-w-6xl py-8 md:py-12">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <div className="bg-muted h-16 w-16 rounded-full flex items-center justify-center">
                <UserRound size={32} />
              </div>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription className="mt-1">{user.email}</CardDescription>
                <p className="text-xs text-muted-foreground mt-1">Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6 w-full md:w-auto">
            <TabsTrigger value="orders" className="flex gap-2">
              <Package size={16} />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex gap-2">
              <Heart size={16} />
              <span>Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-2">
              <UserRound size={16} />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View all your previous orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>You haven't placed any orders yet.</p>
                  <Button asChild className="mt-4">
                    <Link to="/products">Start Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
                <CardDescription>
                  Items you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Your wishlist is empty.</p>
                  <Button asChild className="mt-4">
                    <Link to="/products">Discover Products</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Personal Information</h3>
                    <Button variant="outline" size="sm">Edit Profile</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Security</h3>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="destructive" className="gap-2" onClick={handleLogout}>
                      <LogOut size={16} />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Account;
