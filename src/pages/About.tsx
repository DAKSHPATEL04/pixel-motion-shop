
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';

const About: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl opacity-80 mb-8">
              We're passionate about creating premium products that enhance your setup and workflow.
            </p>
            
            {/* This would be a video in production */}
            <div className="bg-gradient-to-r from-primary to-accent h-96 rounded-lg flex items-center justify-center mb-8">
              <p className="text-white text-xl">Brand Video Would Play Here</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Mission</h2>
            <div className="prose prose-lg mx-auto">
              <p>
                At PixelMotion, we believe that your workspace is more than just a place to get things done—it's an expression of your personality and style. That's why we're dedicated to creating premium mousepads and posters that not only enhance your performance but also elevate the aesthetic of your setup.
              </p>
              <p>
                Founded in 2022 by a team of gamers, designers, and productivity enthusiasts, we set out to create products that we ourselves would love to use. We noticed a gap in the market for high-quality, visually stunning desk accessories that don't compromise on performance.
              </p>
              <p>
                Every product we create undergoes rigorous testing to ensure it meets our exacting standards. From the materials we source to the designs we create, quality is at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'Founder & CEO',
                bio: 'Former professional gamer with a passion for design and technology.',
                image: '/placeholder.svg',
              },
              {
                name: 'Maya Johnson',
                role: 'Creative Director',
                bio: 'Award-winning designer who leads our creative team and product design.',
                image: '/placeholder.svg',
              },
              {
                name: 'David Park',
                role: 'Head of Product',
                bio: 'Ensures all our products meet the highest standards of quality and performance.',
                image: '/placeholder.svg',
              },
            ].map((member, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-muted-foreground mb-4">{member.role}</p>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality',
                description: 'We never compromise on the quality of our products, using only the best materials and manufacturing processes.',
                icon: '✨',
              },
              {
                title: 'Innovation',
                description: 'We constantly push the boundaries of what\'s possible in our product design and functionality.',
                icon: '💡',
              },
              {
                title: 'Sustainability',
                description: 'We\'re committed to reducing our environmental impact through sustainable materials and practices.',
                icon: '🌱',
              },
            ].map((value, index) => (
              <div key={index} className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Setup?</h2>
          <p className="text-xl mb-8 opacity-90">
            Browse our collection of premium mousepads and posters.
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="gap-2">
              Shop Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
