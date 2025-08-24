import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Coins, Star } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  description: string;
  tweetLink: string;
  rewardPerAction: number;
  rewardAmount: number;
  userLimit: number;
  category: string;
  completedActions: number;
  createdAt: string;
  sponsored?: boolean;
}

interface CampaignCardProps {
  campaign: Campaign;
  onComplete: (campaignId: string) => Promise<void>;
}

export const CampaignCard = ({ campaign, onComplete }: CampaignCardProps) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await onComplete(campaign.id);
    } catch (error) {
      console.error('Error completing campaign:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handlePostClick = () => {
    window.open(campaign.tweetLink, '_blank', 'noopener,noreferrer');
  };

  const progressPercentage = campaign.userLimit 
    ? Math.min((campaign.completedActions / campaign.userLimit) * 100, 100)
    : 0;

  const isCompleted = campaign.userLimit && campaign.completedActions >= campaign.userLimit;

  return (
    <Card className={`hover:shadow-elevated transition-all duration-300 border-2 ${
      campaign.sponsored ? 'border-warning bg-gradient-to-br from-warning/5 to-transparent' : 'border-border hover:border-primary/50'
    }`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-bold text-lg text-foreground line-clamp-1">
                {campaign.name}
              </h3>
              {campaign.sponsored && (
                <Star className="w-5 h-5 text-warning" />
              )}
            </div>
            <Badge variant="secondary" className="text-xs">
              {campaign.category}
            </Badge>
          </div>
        </div>

        {/* Description */}
        {campaign.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {campaign.description}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-warning" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                {campaign.rewardPerAction} APT
              </div>
              <div className="text-xs text-muted-foreground">per action</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-primary" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                {campaign.completedActions}/{campaign.userLimit || '∞'}
              </div>
              <div className="text-xs text-muted-foreground">participants</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {campaign.userLimit > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={handlePostClick}
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Post
          </Button>
          
          <Button
            onClick={handleComplete}
            disabled={isCompleting || isCompleted}
            size="sm"
            className={`flex-1 ${
              isCompleted 
                ? 'bg-success hover:bg-success text-success-foreground cursor-not-allowed' 
                : 'bg-gradient-primary hover:opacity-90 text-primary-foreground'
            }`}
          >
            {isCompleting ? 'Processing...' : isCompleted ? 'Completed' : 'Done'}
          </Button>
        </div>

        {/* Sponsored Badge */}
        {campaign.sponsored && (
          <div className="mt-4 flex items-center justify-center">
            <Badge variant="outline" className="border-warning text-warning bg-warning/10">
              <Star className="w-3 h-3 mr-1" />
              Sponsored
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};