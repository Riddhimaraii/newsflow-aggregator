import { NewsArticle } from '@/lib/types';
import NewsCard from './NewsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Newspaper } from 'lucide-react';

interface NewsGridProps {
  articles: NewsArticle[];
  isLoading: boolean;
  bookmarkedUrls: Set<string>;
  onBookmark: (article: NewsArticle) => void;
}

function CardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-card">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export default function NewsGrid({ articles, isLoading, bookmarkedUrls, onBookmark }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Newspaper className="h-12 w-12 mb-4 opacity-40" />
        <p className="text-lg font-medium">No articles found</p>
        <p className="text-sm">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <NewsCard
          key={article.id}
          article={article}
          index={i}
          isBookmarked={bookmarkedUrls.has(article.url)}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  );
}
