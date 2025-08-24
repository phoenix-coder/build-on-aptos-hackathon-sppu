import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { CampaignCard } from "@/components/CampaignCard";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Users, Zap, Target } from "lucide-react";
import {
  storeCampaignToFirebase,
  listenToCampaigns,
  // completeCampaignAction,
  CampaignData,
} from "../../firebase/campaign";

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

const Index = () => {
  const { toast } = useToast();
  const [points, setPoints] = useState(0); // Initialize points to 0
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [twitterId, setTwitterId] = useState<string>();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Fetch campaigns from Firebase
  useEffect(() => {
    const unsubscribe = listenToCampaigns((campaignsData) => {
      // Convert Firebase data to our Campaign interface
      const formattedCampaigns = campaignsData.map((campaign) => ({
        ...campaign,
        // sponsored: campaign.sponsored || false,
      }));

      setCampaigns(formattedCampaigns);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const userPosts = [
    { id: "1", title: "My latest DeFi campaign", name: "Aptos DeFi Launch" },
    { id: "2", title: "NFT promotion post", name: "NFT Collection Drop" },
  ];

  // Placeholder functions for blockchain integration
  const handleClaimPoints = async () => {
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPoints(0);
      toast({
        title: "Points Claimed!",
        description: `Successfully claimed ${points} points to your wallet.`,
      });
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "Failed to claim points. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleConnectWallet = async () => {
    try {
      // Simulate wallet connection (Petra/Martian)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsWalletConnected(true);
      setWalletAddress("0x1234567890abcdef1234567890abcdef12345678");
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Petra wallet.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddCampaign = async (campaign: any) => {
    try {
      // Add campaign to Firebase
      await storeCampaignToFirebase({
        ...campaign,
        completedActions: 0,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Campaign Created",
        description: `"${campaign.name}" has been created successfully.`,
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePurchasePlan = async (planType: string) => {
    try {
      // Simulate blockchain payment
      await new Promise((resolve) => setTimeout(resolve, 2500));
      toast({
        title: "Plan Purchased",
        description: `Successfully purchased ${planType} plan!`,
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Failed to purchase plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSponsorPost = async (postId: string) => {
    try {
      // Simulate 10 APT payment for sponsoring
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Post Sponsored",
        description: "Successfully sponsored post for 10 APT!",
      });
    } catch (error) {
      toast({
        title: "Sponsoring Failed",
        description: "Failed to sponsor post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSetTwitterId = async (newTwitterId: string) => {
    try {
      // Simulate setting Twitter ID
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTwitterId(newTwitterId);
      toast({
        title: "Twitter ID Set",
        description: `Successfully set Twitter ID to @${newTwitterId}`,
      });
    } catch (error) {
      toast({
        title: "Failed to Set Twitter ID",
        description: "Failed to set Twitter ID. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCompleteCampaign = async (campaignId: string) => {
    try {
      // Find the campaign
      const campaign = campaigns.find((c) => c.id === campaignId);
      if (!campaign) return;

      // Update completed actions count
      const newCount = campaign.completedActions + 1;

      // Update in Firebase
      // await completeCampaignAction(campaignId, newCount);

      // Add points based on the reward per action of this specific campaign
      const earnedPoints = Math.floor(campaign.rewardPerAction * 10); // Convert to points
      // setPoints((prevPoints) => {
      //   console.log("Previous points:", prevPoints, "Adding:", earnedPoints);
      //   return prevPoints + earnedPoints;
      // });
      setPoints((prev) => prev + earnedPoints);

      toast({
        title: "Task Completed",
        description: `Earned ${campaign.rewardPerAction} APT (${earnedPoints} points) for completing "${campaign.name}"!`,
      });

      
    } catch (error) {
      console.error("Completion error:", error);
      toast({
        title: "Completion Failed",
        description: "Failed to complete task. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Sort campaigns to show sponsored ones first
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (a.sponsored && !b.sponsored) return -1;
    if (!a.sponsored && b.sponsored) return 1;
    return 0;
  });

  const stats = [
    {
      title: "Active Campaigns",
      value: campaigns.length,
      icon: Target,
      color: "text-primary",
    },
    {
      title: "Total Participants",
      value: campaigns.reduce((sum, c) => sum + c.completedActions, 0),
      icon: Users,
      color: "text-success",
    },
    {
      title: "APT Distributed",
      value: campaigns
        .reduce((sum, c) => sum + c.completedActions * c.rewardPerAction, 0)
        .toFixed(1),
      icon: TrendingUp,
      color: "text-warning",
    },
    {
      title: "Your Points",
      value: points,
      icon: Zap,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        points={points}
        onClaimPoints={handleClaimPoints}
        onConnectWallet={handleConnectWallet}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        twitterId={twitterId}
        onSetTwitterId={handleSetTwitterId}
      />

      <div className="flex">
        <Sidebar
          onAddCampaign={handleAddCampaign}
          onPurchasePlan={handlePurchasePlan}
          onSponsorPost={handleSponsorPost}
          userPosts={userPosts}
        />

        <main className="flex-1 ml-72 p-8">
          {/* Stats Overview */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Campaign Dashboard
            </h1>
            <p className="text-muted-foreground mb-6">
              Manage your Twitter marketing campaigns on Aptos blockchain
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-2xl shadow-card border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Active Campaigns
              </h2>
              <div className="text-sm text-muted-foreground">
                {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}{" "}
                available
              </div>
            </div>

            {sortedCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Campaigns Available
                </h3>
                <p className="text-muted-foreground">
                  Create your first campaign to get started with Twitter
                  marketing on Aptos!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onComplete={handleCompleteCampaign}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default Index;
