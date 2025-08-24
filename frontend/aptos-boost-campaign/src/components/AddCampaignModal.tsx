import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { storeCampaignToFirebase } from "../../firebase/campaign"; // ✅ import service

interface AddCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: any) => Promise<void>;
}

export const AddCampaignModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddCampaignModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userLimit: "",
    rewardAmount: "",
    rewardPerAction: "",
    tweetLink: "",
    category: "",
  });

  const categories = [
    "DeFi",
    "NFT",
    "Gaming",
    "Social",
    "Education",
    "Technology",
    "Marketing",
    "Community",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // try {
    //   const campaign = {
    //     ...formData,
    //     userLimit: parseInt(formData.userLimit),
    //     rewardAmount: parseFloat(formData.rewardAmount),
    //     rewardPerAction: parseFloat(formData.rewardPerAction),
    //     id: Date.now().toString(),
    //     createdAt: new Date().toISOString(),
    //     completedActions: 0
    //   };

    //   await onSubmit(campaign);

    try {
      const campaign = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        userLimit: parseInt(formData.userLimit),
        rewardAmount: parseFloat(formData.rewardAmount),
        rewardPerAction: parseFloat(formData.rewardPerAction),
        tweetLink: formData.tweetLink,
        category: formData.category,
        createdAt: new Date().toISOString(),
        completedActions: 0,
      };

      await onSubmit(storeCampaignToFirebase(campaign));  // ✅ use service

      // Reset form
      setFormData({
        name: "",
        description: "",
        userLimit: "",
        rewardAmount: "",
        rewardPerAction: "",
        tweetLink: "",
        category: "",
      });

      onClose();
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            Create New Campaign
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                placeholder="Enter campaign name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your campaign..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tweetLink">Tweet Link *</Label>
            <Input
              id="tweetLink"
              placeholder="https://twitter.com/..."
              value={formData.tweetLink}
              onChange={(e) => handleInputChange("tweetLink", e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userLimit">User Limit</Label>
              <Input
                id="userLimit"
                type="number"
                placeholder="100"
                value={formData.userLimit}
                onChange={(e) => handleInputChange("userLimit", e.target.value)}
                min="1"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rewardAmount">Total Reward (APT)</Label>
              <Input
                id="rewardAmount"
                type="number"
                step="0.01"
                placeholder="10.00"
                value={formData.rewardAmount}
                onChange={(e) =>
                  handleInputChange("rewardAmount", e.target.value)
                }
                min="0"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rewardPerAction">Reward per Action (APT)</Label>
              <Input
                id="rewardPerAction"
                type="number"
                step="0.01"
                placeholder="0.10"
                value={formData.rewardPerAction}
                onChange={(e) =>
                  handleInputChange("rewardPerAction", e.target.value)
                }
                min="0"
                className="h-12"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.tweetLink ||
                !formData.category
              }
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground min-w-[120px]"
            >
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
