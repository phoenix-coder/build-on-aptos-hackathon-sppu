import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, Zap, Crown, Star } from 'lucide-react';

interface PurchasePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (planType: string) => Promise<void>;
}

interface Plan {
  name: string;
  posts: number;
  price: number;
  icon: React.ElementType;
  popular?: boolean;
  features: string[];
  color: string;
}

export const PurchasePlanModal = ({ isOpen, onClose, onPurchase }: PurchasePlanModalProps) => {
  const [purchasingPlan, setPurchasingPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      name: 'Basic',
      posts: 5,
      price: 40,
      icon: Zap,
      features: ['5 Campaign Posts', 'Basic Analytics', 'Email Support', '30 Days Validity'],
      color: 'text-secondary-foreground'
    },
    {
      name: 'Premium',
      posts: 10,
      price: 70,
      icon: Crown,
      popular: true,
      features: ['10 Campaign Posts', 'Advanced Analytics', 'Priority Support', '60 Days Validity', 'Custom Categories'],
      color: 'text-primary'
    },
    {
      name: 'Pro',
      posts: 20,
      price: 150,
      icon: Star,
      features: ['20 Campaign Posts', 'Premium Analytics', '24/7 Support', '90 Days Validity', 'White-label Options', 'API Access'],
      color: 'text-warning'
    }
  ];

  const handlePurchase = async (planName: string) => {
    setPurchasingPlan(planName);
    try {
      await onPurchase(planName.toLowerCase());
      onClose();
    } catch (error) {
      console.error('Error purchasing plan:', error);
    } finally {
      setPurchasingPlan(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            Choose Your Plan
          </DialogTitle>
          <p className="text-center text-muted-foreground mt-2">
            Upgrade your marketing campaigns with our flexible plans
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card border-2 rounded-3xl p-6 transition-all duration-300 hover:shadow-elevated ${
                plan.popular 
                  ? 'border-primary shadow-elevated' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                  plan.popular ? 'bg-gradient-primary' : 'bg-secondary'
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.popular ? 'text-primary-foreground' : plan.color
                  }`} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">APT</span>
                </div>

                <div className="text-center mb-6">
                  <span className="text-lg font-semibold text-foreground">{plan.posts} Posts</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePurchase(plan.name)}
                disabled={purchasingPlan !== null}
                className={`w-full h-12 rounded-2xl font-medium transition-all ${
                  plan.popular
                    ? 'bg-gradient-primary hover:opacity-90 text-primary-foreground'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {purchasingPlan === plan.name ? 'Processing...' : `Get ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-secondary rounded-2xl">
          <div className="text-center">
            <h4 className="font-semibold text-secondary-foreground mb-2">
              All plans include:
            </h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>• Campaign Analytics</span>
              <span>• Real-time Tracking</span>
              <span>• Secure Payments</span>
              <span>• Mobile App Access</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};