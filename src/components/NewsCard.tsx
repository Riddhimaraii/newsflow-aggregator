import { NewsArticle } from '@/lib/types';
import { Bookmark, BookmarkCheck, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
  isBookmarked?: boolean;
  onBookmark?: (article: NewsArticle) => void;
}

export default function NewsCard({ article, index, isBookmarked, onBookmark }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      {article.imageUrl && (
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-blue-600"
          >
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium">{article.source}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {article.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
          <Link
            to={`/article/${article.id}`}
            state={{ article }}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Read More <ExternalLink className="h-3 w-3" />
          </Link>
          {onBookmark && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onBookmark(article)}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
