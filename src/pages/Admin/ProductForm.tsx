
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  UploadCloud, 
  X, 
  Play, 
  Plus,
  Loader2,
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import AdminLayout from '@/components/admin/AdminLayout';

const formSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  stock: z.string().min(0, "Stock is required"),
  enabled: z.boolean().default(true),
  featured: z.boolean().default(false),
});

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "0",
      enabled: true,
      featured: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      console.log("Form values:", values);
      console.log("Images:", images);
      console.log("Videos:", videos);
      
      // In a real app, we would submit to an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert("Product saved successfully!");
      
      // Redirect or reset form
      // navigate("/admin/products");
      
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, we would upload to a server/storage
      // For demo, just create local URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, we would upload to a server/storage
      // For demo, just create local URLs
      const newVideos = Array.from(files).map(file => URL.createObjectURL(file));
      setVideos(prev => [...prev, ...newVideos]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Product
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="general">
          <div className="border-b">
            <TabsList className="w-full justify-start bg-transparent px-0 mb-0">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="general">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Main Content (Left 2/3) */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                    <CardDescription>
                      Basic information about your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Product name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your product..." 
                                  {...field} 
                                  rows={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Inventory</CardTitle>
                    <CardDescription>
                      Manage pricing and stock levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price ($)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="29.99" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="100" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Sidebar (Right 1/3) */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Form {...form}>
                      <FormField
                        control={form.control}
                        name="enabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Active</FormLabel>
                              <FormDescription>
                                Product will be visible on the store
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </Form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mousepads">Mousepads</SelectItem>
                                  <SelectItem value="desk-pads">Desk Pads</SelectItem>
                                  <SelectItem value="gaming-posters">Gaming Posters</SelectItem>
                                  <SelectItem value="minimalist-posters">Minimalist Posters</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Organization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Form {...form}>
                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Featured Product
                              </FormLabel>
                              <FormDescription>
                                Show on homepage and special collections
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload high-quality images of your product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative aspect-square rounded-md overflow-hidden border bg-muted"
                    >
                      <img 
                        src={image} 
                        alt={`Product ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <label className="aspect-square flex flex-col items-center justify-center border border-dashed rounded-md bg-muted/50 hover:bg-muted/80 cursor-pointer">
                    <UploadCloud className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload Image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleImageUpload}
                      multiple
                    />
                  </label>
                </div>
                
                <div className="border-t pt-6">
                  <CardTitle className="mb-4">Product Videos</CardTitle>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {videos.map((video, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-video rounded-md overflow-hidden border bg-muted"
                      >
                        <video className="w-full h-full object-cover">
                          <source src={video} />
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="bg-black/60 hover:bg-black/80"
                          >
                            <Play className="h-10 w-10" />
                          </Button>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeVideo(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <label className="aspect-video flex flex-col items-center justify-center border border-dashed rounded-md bg-muted/50 hover:bg-muted/80 cursor-pointer">
                      <UploadCloud className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Upload Video</span>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden"
                        onChange={handleVideoUpload}
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <CardTitle>Product Variants</CardTitle>
                <CardDescription>
                  Define different variations of your product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Options</h3>
                      <p className="text-sm text-muted-foreground">Add options like size or color</p>
                    </div>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-6 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">No variants created yet</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Add options to generate variants
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>Search Engine Optimization</CardTitle>
                <CardDescription>
                  Improve your product's visibility in search results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SEO Title</label>
                    <Input placeholder="SEO optimized title" />
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 50-60 characters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Description</label>
                    <Textarea 
                      placeholder="Brief description for search results..." 
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 120-160 characters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL Slug</label>
                    <Input placeholder="product-url-slug" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
