
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
import MainLayout from '@/components/layout/MainLayout';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real implementation, this would send the form data
    console.log('Form submitted');
  };
  
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          We're here to help with any questions or concerns. Fill out the form below, 
          and we'll get back to you as soon as possible.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What's this about?" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  className="min-h-32"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full sm:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Our Location</h3>
                        <p className="text-muted-foreground">
                          123 Design Street<br />
                          San Francisco, CA 94103
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">
                          (555) 123-4567
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">
                          support@pixelmotion.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Business Hours</h3>
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
              <div>
                <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-12">
        <div className="bg-gray-200 h-96 w-full flex items-center justify-center">
          <p className="text-muted-foreground">Interactive map would be displayed here</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
