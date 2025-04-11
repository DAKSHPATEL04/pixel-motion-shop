
import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Twitter,
  Facebook,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from "@/components/ui/use-toast";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real implementation, this would send the form data
    console.log('Form submitted');
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible!",
    });
  };
  
  return (
    <MainLayout>
      <div className="relative">
        {/* Hero section with gradient background */}
        <div className="bg-gradient-to-b from-accent/10 to-background py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
              <p className="text-muted-foreground text-lg">
                We're here to answer your questions and hear your feedback.
                Let us know how we can help you today.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-medium">
                          Name
                        </Label>
                        <Input id="name" placeholder="Your name" required className="border-accent/20 focus-visible:ring-accent" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium">
                          Email
                        </Label>
                        <Input id="email" type="email" placeholder="Your email" required className="border-accent/20 focus-visible:ring-accent" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-medium">
                        Subject
                      </Label>
                      <Input id="subject" placeholder="What's this about?" required className="border-accent/20 focus-visible:ring-accent" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help..."
                        className="min-h-32 border-accent/20 focus-visible:ring-accent"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full sm:w-auto bg-accent hover:bg-accent/90 transition-colors">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/10 p-3 rounded-full">
                        <MapPin className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">Our Location</h3>
                        <p className="text-muted-foreground">
                          123 Design Street<br />
                          San Francisco, CA 94103
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/10 p-3 rounded-full">
                        <Phone className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">Phone</h3>
                        <p className="text-muted-foreground hover:text-accent transition-colors">
                          (555) 123-4567
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/10 p-3 rounded-full">
                        <Mail className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">Email</h3>
                        <p className="text-accent hover:underline">
                          support@pixelmotion.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/10 p-3 rounded-full">
                        <Clock className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9am - 5pm<br />
                          Weekends: 10am - 3pm
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Social Media */}
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="rounded-full border-accent/20 hover:bg-accent/10 hover:text-accent">
                      <Instagram className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full border-accent/20 hover:bg-accent/10 hover:text-accent">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full border-accent/20 hover:bg-accent/10 hover:text-accent">
                      <Facebook className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-12">
        <div className="relative h-96 w-full bg-gradient-to-r from-accent/5 to-accent/20 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="z-10 text-center">
            <h2 className="text-2xl font-bold mb-2">Visit Our Store</h2>
            <p className="text-muted-foreground mb-4">Interactive map would be displayed here</p>
            <Button variant="outline" className="border-accent/20 hover:bg-accent/10 hover:text-accent">
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
