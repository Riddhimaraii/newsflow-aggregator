import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { NewsArticle } from '@/lib/types';
import { toast } from 'sonner';

export function useBookmarks() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ['bookmarks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  const bookmarkedUrls = new Set(bookmarks.map((b: any) => b.news_url));

  const toggleBookmark = useMutation({
    mutationFn: async (article: NewsArticle) => {
      if (!user) throw new Error('Must be signed in');
      const exists = bookmarks.find((b: any) => b.news_url === article.url);
      if (exists) {
        const { error } = await supabase.from('bookmarks').delete().eq('id', exists.id);
        if (error) throw error;
        return { action: 'removed' };
      } else {
        const { error } = await supabase.from('bookmarks').insert({
          user_id: user.id,
          news_title: article.title,
          news_url: article.url,
          news_description: article.description,
          news_image_url: article.imageUrl,
          news_source: article.source,
          category: article.category,
        });
        if (error) throw error;
        return { action: 'saved' };
      }
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success(data.action === 'saved' ? 'Article saved!' : 'Bookmark removed');
    },
    onError: () => {
      toast.error('Sign in to save articles');
    },
  });

  return { bookmarks, bookmarkedUrls, isLoading, toggleBookmark: toggleBookmark.mutate };
}
