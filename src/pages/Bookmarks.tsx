import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, ExternalLink, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Bookmarks() {
  const { user, loading: authLoading } = useAuth();
  const { bookmarks, isLoading } = useBookmarks();
  const qc = useQueryClient();

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  const removeBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id);
    qc.invalidateQueries({ queryKey: ['bookmarks'] });
    toast.success('Bookmark removed');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to news
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="h-6 w-6 text-primary" />
          <h1 className="font-display text-3xl font-bold">Saved Articles</h1>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No saved articles yet</p>
            <p className="text-sm">Bookmark articles to read them later</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((b: any, i: number) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-4 p-4 bg-card rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
              >
                {b.news_image_url && (
                  <img src={b.news_image_url} alt="" className="h-20 w-28 object-cover rounded-md shrink-0 hidden sm:block" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold leading-snug line-clamp-1">{b.news_title}</h3>
                  {b.news_description && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{b.news_description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    {b.news_source && <span>{b.news_source}</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(b.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={b.news_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeBookmark(b.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
