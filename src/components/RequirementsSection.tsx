
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

const requirements = [
  {
    category: 'HTML',
    items: [
      'Semantic HTML structure (header, footer, main, etc.)',
      'Forms with proper validation attributes',
      'Tables or lists for structured data',
      'Embedded media elements (images, videos, etc.)',
      'Custom data attributes',
    ]
  },
  {
    category: 'CSS',
    items: [
      'Responsive design with media queries',
      'Flexbox or CSS Grid layouts',
      'Custom animations and transitions',
      'CSS variables for easy theming',
      'Pseudo-elements and pseudo-classes',
    ]
  },
  {
    category: 'JavaScript',
    items: [
      'Form validation function',
      'DOM manipulation function',
      'Event handling function',
      'Data manipulation or calculation function',
    ]
  }
];

// Feature animations
const features = [
  {
    title: 'Semantic HTML',
    description: 'Build your site with proper HTML5 semantic elements',
    icon: '🏗️',
    delay: 0
  },
  {
    title: 'Responsive Design',
    description: 'Create layouts that adapt to any screen size',
    icon: '📱',
    delay: 100
  },
  {
    title: 'CSS Animations',
    description: 'Add life to your website with smooth transitions',
    icon: '✨',
    delay: 200
  },
  {
    title: 'Interactive Elements',
    description: 'Engage users with interactive components',
    icon: '🖱️',
    delay: 300
  },
  {
    title: 'Accessibility',
    description: 'Ensure your website can be used by everyone',
    icon: '♿',
    delay: 400
  },
  {
    title: 'Performance',
    description: 'Fast loading times and smooth interactions',
    icon: '⚡',
    delay: 500
  },
];

const RequirementsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('html');
  
  return (
    <section id="requirements" className="py-24 bg-waffle-50/50">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-waffle-800">Challenge Requirements</h2>
          <p className="text-lg text-syrup-700">
            Create a website that showcases the following HTML, CSS, and JavaScript features
            to be eligible for the delicious waffle prizes!
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
        
        {/* Requirements accordion */}
        <Card className="border-waffle-200 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl text-center text-waffle-800">Detailed Requirements</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {requirements.map((req, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-waffle-200">
                  <AccordionTrigger className="text-lg font-semibold text-waffle-800 hover:text-waffle-600">
                    {req.category} Requirements
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 py-2">
                      {req.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-waffle-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-syrup-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

interface Feature {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn(
        "bg-white/80 backdrop-blur-sm border border-waffle-200 rounded-2xl p-6 transition-all duration-300",
        isHovered && "shadow-lg transform -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-bold text-waffle-800 mb-2">{feature.title}</h3>
      <p className="text-syrup-700">{feature.description}</p>
    </div>
  );
};

export default RequirementsSection;
