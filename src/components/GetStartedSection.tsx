
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Steps in the process
const steps = [
  {
    title: 'Register',
    description: 'Sign up to participate in the Waffle Web Challenge',
    icon: '📝'
  },
  {
    title: 'Build',
    description: 'Create your website following the requirements',
    icon: '🛠️'
  },
  {
    title: 'Submit',
    description: 'Upload your project and documentation',
    icon: '📤'
  },
  {
    title: 'Win',
    description: 'Get awarded and enjoy delicious waffles',
    icon: '🧇'
  }
];

const GetStartedSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  const { toast } = useToast();

  // Validate form
  const isFormValid = () => {
    return name.trim() !== '' && 
           email.trim() !== '' && 
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
           message.trim() !== '';
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: 'Please check your form',
        description: 'Make sure all fields are filled correctly.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Display success after simulating submission
    setTimeout(() => {
      toast({
        title: 'Registration complete!',
        description: 'Get ready to build something amazing and win waffles!',
      });
      
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
      
      // Highlight each step in sequence
      let step = 0;
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = window.setInterval(() => {
        setActiveStep(step);
        step = (step + 1) % 4;
        
        if (step === 0) {
          clearInterval(intervalRef.current as number);
          setTimeout(() => setActiveStep(-1), 2000);
        }
      }, 800) as unknown as number;
      
    }, 1500);
  };
  
  return (
    <section id="get-started" className="py-24 bg-gradient-to-b from-white to-waffle-50/50">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-waffle-800">Get Started Now</h2>
          <p className="text-lg text-syrup-700">
            Register for the Waffle Web Challenge and get ready to showcase your skills!
          </p>
        </div>
        
        {/* Process steps */}
        <div className="flex flex-wrap justify-center mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={cn(
                "w-16 md:w-32 flex flex-col items-center",
                index !== steps.length - 1 && "after:content-[''] after:h-1 after:w-full after:bg-waffle-200 after:absolute after:top-7 after:left-1/2"
              )}>
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center mb-2 z-10 transition-all duration-300 text-2xl",
                  activeStep === index 
                    ? "bg-waffle-500 text-white scale-110" 
                    : "bg-waffle-100 text-waffle-700"
                )}>
                  {step.icon}
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-waffle-800">{step.title}</h4>
                  <p className="text-sm text-syrup-600 hidden md:block">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Registration form */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-waffle-200 shadow-lg overflow-hidden">
            <CardHeader className="bg-waffle-50 border-b border-waffle-100">
              <CardTitle className="text-2xl text-waffle-800">Register Your Interest</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-syrup-800">
                    Full Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-waffle-200 focus:border-waffle-500 focus:ring-waffle-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-syrup-800">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-waffle-200 focus:border-waffle-500 focus:ring-waffle-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-syrup-800">
                    Why are you interested in this challenge?
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your web development experience and why you're excited about this challenge" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-waffle-200 focus:border-waffle-500 focus:ring-waffle-500 min-h-[120px]"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-waffle-50/50 border-t border-waffle-100">
                <Button 
                  type="submit" 
                  className="waffle-button w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Register Now'}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          {/* Additional call-to-action */}
          <div className="mt-8 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-waffle-200 text-center">
            <p className="text-syrup-700">
              Have questions? Contact us at <a href="mailto:info@wafflewebchallenge.com" className="text-waffle-600 font-medium">info@wafflewebchallenge.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
