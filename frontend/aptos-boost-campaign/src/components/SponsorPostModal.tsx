import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Megaphone, ExternalLink } from 'lucide-react';

interface SponsorPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSponsor: (postId: string) => Promise<void>;
  posts: Array<{ id: string; title: string; name: string }>;
}

export const SponsorPostModal = ({ isOpen, onClose, onSponsor, posts }: SponsorPostModalProps) => {
  const [sponsoringPost, setSponsoringPost] = useState<string | null>(null);

  const handleSponsor = async (postId: string) => {
    setSponsoringPost(postId);
    try {
      await onSponsor(postId);
      onClose();
    } catch (error) {
      console.error('Error sponsoring post:', error);
    } finally {
      setSponsoringPost(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary flex items-center">
            <Megaphone className="w-6 h-6 mr-2" />
            Sponsor Your Posts
          </DialogTitle>
          <p className="text-muted-foreground">
            Select a post to sponsor for 10 APT. Sponsored posts get priority placement and better visibility.
          </p>
        </DialogHeader>

        <div className="mt-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <Megaphone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Posts Available</h3>
              <p className="text-muted-foreground">
                You don't have any posts to sponsor yet. Create some campaigns first!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{post.name}</h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {post.title}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-primary font-medium">Cost: 10 APT</span>
                          <span className="text-success">• Priority Placement</span>
                          <span className="text-warning">• 2x Visibility</span>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <Button
                          onClick={() => handleSponsor(post.id)}
                          disabled={sponsoringPost !== null}
                          className="bg-gradient-primary hover:opacity-90 text-primary-foreground min-w-[100px]"
                        >
                          {sponsoringPost === post.id ? 'Processing...' : 'Sponsor'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-secondary rounded-2xl">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div className="text-sm text-secondary-foreground">
              <strong>How sponsoring works:</strong> Sponsored posts are shown at the top of campaign feeds, 
              receive 2x more visibility, and are marked with a special sponsor badge. Payment is processed 
              immediately via your connected Aptos wallet.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};