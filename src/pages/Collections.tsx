
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';

// Mock collections data
const collections = [
  {
    id: 'gaming-setup',
    title: 'Gaming Setup Collection',
    description: 'Complete your gaming space with our curated selection of mousepads and posters.',
    image: '/placeholder.svg',
    products: ['1', '2', '3', '4'],
  },
  {
    id: 'minimalist-workspace',
    title: 'Minimalist Workspace',
    description: 'Clean, elegant designs to create a distraction-free environment for focus and productivity.',
    image: '/placeholder.svg',
    products: ['3', '5', '7', '9'],
  },
  {
    id: 'rgb-vibes',
    title: 'RGB Vibes',
    description: 'Vibrant, colorful designs inspired by the RGB lighting aesthetic popular in gaming setups.',
    image: '/placeholder.svg',
    products: ['2', '4', '6', '8'],
  },
  {
    id: 'retro-gaming',
    title: 'Retro Gaming',
    description: 'Nostalgic designs celebrating classic games and consoles from the past.',
    image: '/placeholder.svg',
    products: ['1', '3', '5', '7'],
  }
];

const Collections: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <MainLayout>
      <div className="container py-16 md:py-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Collections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections designed to elevate your space and enhance your experience.
          </p>
        </header>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mx-auto">
            <TabsTrigger value="all">All Collections</TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="themed">Themed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden border-0 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-full bg-gray-100">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{collection.title}</h2>
                    <p className="text-muted-foreground mb-4">{collection.description}</p>
                  </div>
                  <Button className="self-start group">
                    View Collection
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Collections;
