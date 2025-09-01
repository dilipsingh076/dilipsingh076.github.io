import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiClock, FiTag } from 'react-icons/fi';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    slug: string;
    author?: string;
    isFeatured?: boolean;
  };
  index?: number;
  variant?: 'default' | 'featured';
}

export const BlogCard = ({ post, index = 0, variant = 'default' }: BlogCardProps) => {
  const isFeatured = variant === 'featured';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className={`bg-card rounded-xl border border-border overflow-hidden card-hover ${
        isFeatured ? 'md:flex' : ''
      }`}
    >
      <div className={isFeatured ? 'md:w-1/3' : ''}>
        <div className={`bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center ${
          isFeatured ? 'h-48 md:h-full' : 'h-48'
        }`}>
          <FiTag className={`text-primary/50 ${isFeatured ? 'w-16 h-16' : 'w-12 h-12'}`} />
        </div>
      </div>
      
      <div className={`p-6 ${isFeatured ? 'md:w-2/3' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
            {post.category}
          </span>
          {post.isFeatured && (
            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm rounded-full font-medium">
              Featured
            </span>
          )}
        </div>
        
        <h3 className={`font-semibold text-foreground mb-3 line-clamp-2 ${
          isFeatured ? 'text-2xl font-bold' : 'text-xl'
        }`}>
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className={`flex items-center gap-4 ${isFeatured ? '' : 'flex-col sm:flex-row sm:gap-4'}`}>
            {post.author && (
              <div className="flex items-center gap-2">
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            {isFeatured ? 'Read Full Article' : 'Read More'}
            <FiArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.article>
  );
};

