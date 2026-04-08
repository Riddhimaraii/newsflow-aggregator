import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { NewsArticle } from '@/lib/types';

export default function ArticleDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article as NewsArticle;

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6 font-display">Article Not Found</h1>
        <Button onClick={() => navigate('/')}>Return to Homepage</Button>
      </div>
    );
  }

  // Format date natively instead of timeAgo
  const publishDate = format(new Date(article.publishedAt), 'MMMM d, yyyy • h:mm a');

  // Intelligent paragraph expansion for description if short
  const paragraphs = article.description
    .replace(/\.\.\.$/, '.') // Remove trailing truncation dots
    .split('. ')
    .filter((p) => p.trim().length > 0)
    .map((p) => (p.endsWith('.') ? p : p + '.'));

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Header searchQuery="" onSearchChange={() => { navigate('/'); }} />
      
      <main className="container max-w-3xl py-8 md:py-12 flex-1 animate-fade-in mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          className="mb-8 -ml-4 text-muted-foreground hover:text-foreground" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
        </Button>

        <article className="space-y-6">
          <header className="space-y-6">
            <h1 className="text-4xl md:text-[2.75rem] font-bold leading-tight font-display text-foreground tracking-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-[0.95rem] text-muted-foreground pb-6 border-b border-border/40">
              <div className="flex items-center gap-2 font-medium text-foreground/80">
                <User className="h-[18px] w-[18px]" />
                <span>{article.source}</span>
              </div>
              <span className="text-border px-1">•</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-[18px] w-[18px]" />
                <time dateTime={article.publishedAt}>{publishDate}</time>
              </div>
            </div>
          </header>

          {article.imageUrl && (
            <figure className="overflow-hidden bg-muted/20">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-auto max-h-[550px] object-cover" 
              />
            </figure>
          )}

          <div className="pt-6 pb-20">
            <div className="text-[18px] leading-[1.75] text-foreground/90 space-y-6 font-normal">
              {paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              {/* Fallback extension block to simulate a full reading experience */}
              {paragraphs.length < 3 && (
                <>
                  <p>
                    Analysts expect that the developments detailed above will continue to reshape 
                    the structural dynamics of the industry over the coming months. Observers are 
                    closely monitoring the situation as stakeholders prepare for the next series of shifts.
                  </p>
                  <p>
                    For now, it remains to be seen precisely how these early indicators will crystallize 
                    into long-term trends, but the fundamental shifts present compelling opportunities.
                  </p>
                </>
              )}
            </div>

            {/* Conditionally add the external read button if valid URL */}
            {article.url && !article.url.includes('example.com') && (
              <div className="mt-12 p-8 bg-secondary/30 rounded-2xl border border-primary/10 text-center space-y-4">
                <p className="text-muted-foreground font-medium">
                  Full article available on source website
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto font-semibold">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read Full Article <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
