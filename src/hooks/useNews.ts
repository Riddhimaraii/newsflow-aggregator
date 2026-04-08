import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRealNews, PaginatedNews } from '@/lib/api';
import { NewsCategory } from '@/lib/types';

export function useNews(category?: NewsCategory, query?: string) {
  return useInfiniteQuery<PaginatedNews>({
    queryKey: ['news', category, query],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      return fetchRealNews(category, query, pageParam as number, 20);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}
