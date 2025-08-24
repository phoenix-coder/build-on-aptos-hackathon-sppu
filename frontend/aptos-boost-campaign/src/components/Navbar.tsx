import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Coins, Twitter } from "lucide-react";
import { getAptosWallets } from "@aptos-labs/wallet-standard";
import { toast } from "./ui/use-toast";

interface NavbarProps {
  points: number;
  onClaimPoints: () => Promise<void>;
  onConnectWallet: () => Promise<void>;
  isWalletConnected: boolean;
  walletAddress?: string;
  twitterId?: string;
  onSetTwitterId: (twitterId: string) => Promise<void>;
}

export const Navbar = ({
  points,
  onClaimPoints,
  onConnectWallet,
  isWalletConnected: propIsWalletConnected, // Renamed to avoid conflict
  walletAddress: propWalletAddress, // Renamed to avoid conflict
  twitterId,
  onSetTwitterId,
}: NavbarProps) => {
  const [isClaimingPoints, setIsClaimingPoints] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showTwitterInput, setShowTwitterInput] = useState(false);
  const [twitterIdInput, setTwitterIdInput] = useState(twitterId || "");
  const [isSettingTwitterId, setIsSettingTwitterId] = useState(false);
  const { aptosWallets } = getAptosWallets();
  const [walletAddress, setWalletAddress] = useState<string | null>(
    propWalletAddress || null
  );
  const [isWalletConnected, setIsWalletConnected] = useState(
    propIsWalletConnected || false
  );

  // Use effect to update local state when props change
  useEffect(() => {
    if (propWalletAddress) setWalletAddress(propWalletAddress);
    setIsWalletConnected(propIsWalletConnected || false);
    // No need to set points as state since we're using it directly from props
  }, [propWalletAddress, propIsWalletConnected, points]);

  const handleClaimPoints = async () => {
    // setIsClaimingPoints(true);
    // try {
    //   await onClaimPoints();
    // } finally {
    //   setIsClaimingPoints(false);
    // }
    try {
    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Points Claimed!",
      description: `Successfully claimed ${points} points to your wallet.`,
    });

    // Reset points after claiming
// Points are managed through props, no local state setter needed
// The parent component should handle updating points
await onClaimPoints();
  } catch (error) {
    toast({
      title: "Claim Failed",
      description: "Failed to claim points. Please try again.",
      variant: "destructive",
    });
  }
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      if (!window.aptos) {
        alert("Petra Wallet not found. Please install it.");
        return;
      }
      const response = await window.aptos.connect();
      setWalletAddress(response.address);
      setIsWalletConnected(true); // Update wallet connected status
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect to wallet.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSetTwitterId = async () => {
    if (!twitterIdInput.trim()) return;

    setIsSettingTwitterId(true);
    try {
      await onSetTwitterId(twitterIdInput.trim());
      setShowTwitterInput(false);
    } finally {
      setIsSettingTwitterId(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                A
              </span>
            </div>
            <h1 className="text-xl font-bold text-primary">AptosBoost</h1>
          </div>

          {/* Center - Points/Claim */}
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-warning" />
            <span className="text-foreground font-medium mr-2">
              Points: {points}
            </span>
            {points >= 20 && (
              // <Button
              //   onClick={handleClaimPoints}
              //   disabled={isClaimingPoints}
              //   className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium px-6"
              // >
              //   {isClaimingPoints ? "Claiming..." : "Claim Points"}
              // </Button>

              <Button
    onClick={async () => {
      setIsClaimingPoints(true);
      try {
        await onClaimPoints();
        toast({
          title: "Points Claimed!",
          description: `Successfully claimed ${points} points to your wallet.`,
        });
        // Reset points after claiming
      } finally {
        setIsClaimingPoints(false);
      }
    }}
    disabled={isClaimingPoints}
    className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium px-6"
  >
    {isClaimingPoints ? "Claiming..." : "Claim Points"}
  </Button>
            )}
          </div>

          {/* Right - Twitter ID & Wallet Connection */}
          <div className="flex items-center space-x-4">
            {/* Twitter ID Section */}
            <div className="relative">
              {twitterId ? (
                <div className="flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-2xl">
                  <Twitter className="w-4 h-4 text-accent" />
                  <span className="text-accent-foreground font-medium">
                    @{twitterId}
                  </span>
                </div>
              ) : showTwitterInput ? (
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter Twitter ID"
                    value={twitterIdInput}
                    onChange={(e) => setTwitterIdInput(e.target.value)}
                    className="w-40"
                    onKeyDown={(e) => e.key === "Enter" && handleSetTwitterId()}
                  />
                  <Button
                    onClick={handleSetTwitterId}
                    disabled={isSettingTwitterId || !twitterIdInput.trim()}
                    size="sm"
                  >
                    {isSettingTwitterId ? "Setting..." : "Set"}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowTwitterInput(false);
                      setTwitterIdInput(twitterId || "");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowTwitterInput(true)}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Set Twitter ID
                </Button>
              )}
            </div>

            {/* Wallet Connection */}
            <div className="flex items-center">
              {isWalletConnected && walletAddress ? (
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-2xl">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-secondary-foreground font-medium">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
              ) : (
                <Button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
