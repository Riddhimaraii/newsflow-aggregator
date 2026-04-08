import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const trendingTopics = [
  'AI Regulation', 'Climate Summit', 'Quantum Computing', 'Space Tourism', 'Olympic 2028',
];

export default function TrendingBar({ onTopicClick }: { onTopicClick: (t: string) => void }) {
  return (
    <div className="bg-secondary/50 border-b border-border">
      <div className="container flex items-center gap-3 py-2.5 overflow-x-auto scrollbar-hide">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary shrink-0">
          <TrendingUp className="h-3.5 w-3.5" />
          Trending
        </span>
        {trendingTopics.map((topic, i) => (
          <motion.button
            key={topic}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => onTopicClick(topic)}
            className="px-3 py-1 rounded-full bg-card text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors whitespace-nowrap border border-border"
          >
            {topic}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
