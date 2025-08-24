import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  CreditCard,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AddCampaignModal } from "./AddCampaignModal";
import { PurchasePlanModal } from "./PurchasePlanModal";
import { SponsorPostModal } from "./SponsorPostModal";

interface SidebarProps {
  onAddCampaign: (campaign: any) => Promise<void>;
  onPurchasePlan: (planType: string) => Promise<void>;
  onSponsorPost: (postId: string) => Promise<void>;
  userPosts: Array<{ id: string; title: string; name: string }>;
}

export const Sidebar = ({
  onAddCampaign,
  onPurchasePlan,
  onSponsorPost,
  userPosts,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [showPurchasePlan, setShowPurchasePlan] = useState(false);
  const [showSponsorPost, setShowSponsorPost] = useState(false);

  const sidebarItems = [
    {
      icon: Plus,
      label: "Add Campaign",
      onClick: () => setShowAddCampaign(true),
      variant: "default" as const,
    },
    {
      icon: CreditCard,
      label: "Purchase Plan",
      onClick: () => setShowPurchasePlan(true),
      variant: "secondary" as const,
    },
    {
      icon: Megaphone,
      label: "Sponsor Post",
      onClick: () => setShowSponsorPost(true),
      variant: "secondary" as const,
    },
  ];

  return (
    <>
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r shadow-card transition-all duration-300 z-40 ${
          isCollapsed ? "w-16" : "w-72"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 w-6 h-6 bg-card border rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>

        <div className="p-6 h-full overflow-y-auto">
          <div className="space-y-4">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                onClick={item.onClick}
                variant={item.variant}
                className={`w-full justify-start h-12 ${
                  isCollapsed ? "px-3" : "px-4"
                } ${
                  item.variant === "default"
                    ? "bg-gradient-primary hover:opacity-90 text-primary-foreground"
                    : "hover:bg-secondary-hover"
                }`}
              >
                <item.icon
                  className={`${isCollapsed ? "w-5 h-5" : "w-5 h-5 mr-3"}`}
                />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Button>
            ))}
          </div>

          {!isCollapsed && (
            <div className="mt-8 pt-6 border-t">
              <div className="text-sm text-muted-foreground mb-4">
                Quick Actions
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-secondary rounded-2xl">
                  <div className="font-medium text-secondary-foreground">
                    Campaign Limit
                  </div>
                  <div className="text-muted-foreground">
                    5/10 campaigns active
                  </div>
                </div>
                <div className="p-3 bg-secondary rounded-2xl">
                  <div className="font-medium text-secondary-foreground">
                    Plan Status
                  </div>
                  <div className="text-primary font-medium">Premium Active</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Modals */}
      <AddCampaignModal
        isOpen={showAddCampaign}
        onClose={() => setShowAddCampaign(false)}
        onSubmit={onAddCampaign}
      />

      <PurchasePlanModal
        isOpen={showPurchasePlan}
        onClose={() => setShowPurchasePlan(false)}
        onPurchase={onPurchasePlan}
      />

      <SponsorPostModal
        isOpen={showSponsorPost}
        onClose={() => setShowSponsorPost(false)}
        onSponsor={onSponsorPost}
        posts={userPosts}
      />
    </>
  );
};
