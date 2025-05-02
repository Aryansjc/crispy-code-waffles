
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock gallery items
const galleryItems = [
  {
    id: 1,
    title: 'Responsive Dashboard',
    category: 'desktop',
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'A beautiful responsive dashboard with interactive charts and graphs.',
  },
  {
    id: 2,
    title: 'Mobile App Interface',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Clean and intuitive mobile application interface design.',
  },
  {
    id: 3,
    title: 'E-commerce Product Page',
    category: 'desktop',
    image: 'https://images.unsplash.com/photo-1491897554428-130a60dd4757?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Modern e-commerce product page with detailed product visualization.',
  },
  {
    id: 4,
    title: 'Animated Landing Page',
    category: 'animation',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Animated landing page with smooth scrolling and transitions.',
  },
  {
    id: 5,
    title: 'Weather App',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1530563885674-66db50a1af19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Minimalist weather application with dynamic backgrounds.',
  },
  {
    id: 6,
    title: 'Interactive Form',
    category: 'animation',
    image: 'https://images.unsplash.com/photo-1555421689-3f034dbb7a37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Animated form with real-time validation and feedback.',
  },
];

const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter gallery items based on active category
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);
  
  return (
    <section id="gallery" className="py-24">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-waffle-800">Inspiring Web Design Gallery</h2>
          <p className="text-lg text-syrup-700">Check out past submissions and get inspired for your own web creation!</p>
        </div>
        
        {/* Gallery filters */}
        <Tabs 
          defaultValue="all" 
          className="mb-8"
          onValueChange={value => setActiveCategory(value)}
        >
          <div className="flex justify-center">
            <TabsList className="bg-waffle-100/50 border border-waffle-200">
              <TabsTrigger value="all" className="data-[state=active]:bg-waffle-500 data-[state=active]:text-white">
                All Projects
              </TabsTrigger>
              <TabsTrigger value="desktop" className="data-[state=active]:bg-waffle-500 data-[state=active]:text-white">
                Desktop
              </TabsTrigger>
              <TabsTrigger value="mobile" className="data-[state=active]:bg-waffle-500 data-[state=active]:text-white">
                Mobile
              </TabsTrigger>
              <TabsTrigger value="animation" className="data-[state=active]:bg-waffle-500 data-[state=active]:text-white">
                Animation
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Gallery grid */}
          <TabsContent 
            value={activeCategory}
            className="mt-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Submit your project CTA */}
        <div className="mt-16 flex justify-center">
          <Button 
            className="waffle-button px-8 py-6 text-lg"
            onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Submit Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const GalleryCard = ({ item }: { item: GalleryItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "waffle-card overflow-hidden transform transition-all duration-300",
        isHovered && "scale-[1.02]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-56">
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm z-10">
          {item.category}
        </div>
        
        {/* Image */}
        <img 
          src={item.image} 
          alt={item.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-110"
          )}
        />
        
        {/* Overlay gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}></div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-waffle-800 mb-2">{item.title}</h3>
        <p className="text-syrup-700">{item.description}</p>
      </CardContent>
    </Card>
  );
};

export default GallerySection;
