
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const prizes = [
  {
    id: 'first',
    title: 'First Place',
    waffles: 'Unlimited Waffles',
    toppings: ['Maple Syrup', 'Fresh Berries', 'Whipped Cream', 'Chocolate Sauce'],
    features: [
      'Certificate of Achievement',
      'Featured on Event Website',
      'Gift Card ($100 value)',
      'Web Developer Toolkit'
    ],
    color: 'from-syrup-400 to-syrup-600',
    icon: '🏆',
    border: 'border-syrup-500',
    highlight: true
  },
  {
    id: 'second',
    title: 'Second Place',
    waffles: '20 Waffles',
    toppings: ['Maple Syrup', 'Fresh Berries', 'Whipped Cream'],
    features: [
      'Certificate of Achievement',
      'Featured on Event Website',
      'Gift Card ($50 value)'
    ],
    color: 'from-waffle-400 to-waffle-600',
    icon: '🥈',
    border: 'border-waffle-500',
    highlight: false
  },
  {
    id: 'third',
    title: 'Third Place',
    waffles: '10 Waffles',
    toppings: ['Maple Syrup', 'Whipped Cream'],
    features: [
      'Certificate of Achievement',
      'Featured on Event Website'
    ],
    color: 'from-butter-400 to-butter-600',
    icon: '🥉',
    border: 'border-butter-500',
    highlight: false
  }
];

const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="py-24 bg-waffle-50">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-waffle-800">Delicious Prizes</h2>
          <p className="text-lg text-syrup-700">
            Win mouthwatering waffles and amazing prizes for your web development skills!
          </p>
        </div>
        
        {/* Prizes grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {prizes.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
        </div>
        
        {/* Participation prize */}
        <div className="mt-16 max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl border border-waffle-200 p-6 text-center">
          <h3 className="text-xl font-bold text-waffle-800 mb-2">All Qualified Submissions</h3>
          <p className="text-syrup-700 mb-4">
            Everyone who submits a qualifying entry will receive a voucher for 2 free waffles!
          </p>
          <div className="flex justify-center">
            <span className="text-4xl">🧇</span>
          </div>
        </div>
      </div>
    </section>
  );
};

interface Prize {
  id: string;
  title: string;
  waffles: string;
  toppings: string[];
  features: string[];
  color: string;
  icon: string;
  border: string;
  highlight: boolean;
}

const PrizeCard: React.FC<{ prize: Prize }> = ({ prize }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className={cn(
      "relative",
      prize.highlight ? "md:-mt-4" : ""
    )}>
      {prize.highlight && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-syrup-600 text-white text-sm font-bold px-4 py-1 rounded-full">
          Top Prize
        </div>
      )}
      
      <Card 
        className={cn(
          "overflow-hidden h-full transition-all duration-300 border-2",
          prize.border,
          prize.highlight ? "shadow-xl" : "shadow-md",
          isHovered && "transform -translate-y-2 shadow-xl"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Prize header */}
        <div className={cn(
          "bg-gradient-to-r p-6 text-white text-center",
          prize.color
        )}>
          <div className="text-4xl mb-2">{prize.icon}</div>
          <h3 className="text-2xl font-bold">{prize.title}</h3>
        </div>
        
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-waffle-800 mb-4">
            {prize.waffles}
          </div>
          
          <h4 className="font-medium text-syrup-800 mb-2">Toppings:</h4>
          <ul className="mb-6">
            {prize.toppings.map((topping, index) => (
              <li key={index} className="text-syrup-700 py-1">{topping}</li>
            ))}
          </ul>
          
          <div className="border-t border-waffle-200 pt-4">
            <h4 className="font-medium text-syrup-800 mb-2">Also includes:</h4>
            <ul>
              {prize.features.map((feature, index) => (
                <li key={index} className="text-syrup-700 py-1">{feature}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrizesSection;
