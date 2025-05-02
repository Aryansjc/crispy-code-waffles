
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { List, Check } from 'lucide-react';

const rules = [
  {
    category: 'event',
    title: 'Event Rules',
    items: [
      'All Hack Clubbers under 18 can participate',
      'High schoolers over 18 in the USA can participate through a club/hackathon',
      'Participants must register before the deadline',
      'Each participant can submit only one project',
      'Team submissions are allowed with a maximum of 3 members per team'
    ]
  },
  {
    category: 'conduct',
    title: 'Code of Conduct',
    items: [
      'All participants must adhere to the Hack Club Code of Conduct',
      'Be respectful and supportive of other participants',
      'Inappropriate or offensive content will result in disqualification',
      'All communication should be constructive and respectful',
      'Harassment of any kind will not be tolerated'
    ]
  },
  {
    category: 'submission',
    title: 'Submission Rules',
    items: [
      'All submissions must be original work',
      'No copy-pasting code from other projects or sources',
      'Submissions must be made before the deadline (no exceptions)',
      'Projects must be hosted and accessible for judging',
      'Source code must be publicly available on GitHub'
    ]
  }
];

const RulesSection: React.FC = () => {
  // Animation function to calculate delay for items
  const getAnimationDelay = (index: number) => {
    return `${100 + (index * 75)}ms`;
  };
  
  return (
    <section id="rules" className="py-24">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-waffle-800">Competition Rules 🧇</h2>
          <p className="text-lg text-syrup-700">
            Follow these guidelines to ensure your submission is valid and qualifies for our delicious waffle prizes!
          </p>
        </div>
        
        {/* Rules tabs */}
        <Tabs defaultValue="event" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-waffle-100/50 border border-waffle-200 h-auto p-1">
              {rules.map((rule) => (
                <TabsTrigger 
                  key={rule.category}
                  value={rule.category}
                  className="data-[state=active]:bg-waffle-500 data-[state=active]:text-white px-4 py-2"
                >
                  {rule.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {rules.map((rule) => (
            <TabsContent 
              key={rule.category}
              value={rule.category}
              className="focus:outline-none"
            >
              <Card className="border-waffle-200 shadow-md bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {rule.items.map((item, index) => (
                      <RuleItem key={index} item={item} delay={getAnimationDelay(index)} />
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {rule.category === 'submission' && (
                <div className="mt-6 bg-waffle-100 border border-waffle-200 p-4 rounded-lg">
                  <p className="text-sm text-syrup-700 flex items-center">
                    <svg className="w-5 h-5 text-waffle-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Submissions that don't meet all requirements may still be considered, but might not qualify for all prizes.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

interface RuleItemProps {
  item: string;
  delay: string;
}

const RuleItem: React.FC<RuleItemProps> = ({ item, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <li 
      className="flex items-start p-3 rounded-lg transition-colors duration-200 border border-transparent"
      style={{
        animation: `fadeIn 0.5s ease-out forwards`,
        animationDelay: delay,
        opacity: 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "mr-3 p-1.5 rounded-full bg-waffle-100 text-waffle-600 transition-all duration-300",
        isHovered && "bg-waffle-500 text-white"
      )}>
        {isHovered ? <Check className="h-4 w-4" /> : <List className="h-4 w-4" />}
      </div>
      <span className="text-syrup-800">{item}</span>
    </li>
  );
};

export default RulesSection;
