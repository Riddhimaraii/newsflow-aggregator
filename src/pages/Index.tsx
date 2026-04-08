import { useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import TrendingBar from '@/components/TrendingBar';
import NewsGrid from '@/components/NewsGrid';
import { useNews } from '@/hooks/useNews';
import { useBookmarks } from '@/hooks/useBookmarks';
import { NewsCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertCircle } from 'lucide-react';

export default function Index() {
  const [category, setCategory] = useState<NewsCategory>('general');
  const [search, setSearch] = useState('');
  
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isError,
    refetch,
    isFetching
  } = useNews(category, search);

  const articles = data ? data.pages.flatMap((page) => page.articles) : [];
  
  const { bookmarkedUrls, toggleBookmark } = useBookmarks();

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={search} onSearchChange={setSearch} />
      <TrendingBar onTopicClick={(t) => setSearch(t)} />
      <CategoryBar selected={category} onChange={(c) => { setCategory(c); setSearch(''); }} />
      <main className="container py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">
              {search ? `Results for "${search}"` : category === 'general' ? 'Top Stories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isLoading ? 'Loading...' : `${articles.length} total articles loaded`}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {isError && (
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-4 mb-8">
            <AlertCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-destructive">News API Failed</h3>
              <p className="text-sm text-destructive/80 mt-1">
                Unable to load news. Please try again later.
              </p>
            </div>
          </div>
        )}
        
        <NewsGrid
          articles={articles}
          isLoading={isLoading && articles.length === 0}
          bookmarkedUrls={bookmarkedUrls}
          onBookmark={toggleBookmark}
        />

        {hasNextPage && (
          <div className="mt-12 mb-8 flex justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => fetchNextPage()} 
              disabled={isFetchingNextPage}
              className="px-8"
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load More Articles'}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
