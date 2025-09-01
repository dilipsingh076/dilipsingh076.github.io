'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiTag, FiShare2, FiBookmark, FiHeart } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogPostBySlug, clearCurrentPost } from '@/store/slices/blogSlice';

export default function BlogDetailPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentPost, loading, error } = useAppSelector((state: any) => state.blog);

  const slug = params.slug as string;

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogPostBySlug(slug));
    }

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="pt-16">
          <div className="container-max px-4 py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading article...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !currentPost) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="pt-16">
          <div className="container-max px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The article you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back to Blog
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-max px-4 py-8"
        >
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors mb-8"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to Blog
              </motion.button>
            </Link>

            {/* Article Header */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-8 mb-8"
            >
              {/* Category and Featured Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                  {currentPost.category}
                </span>
                {currentPost.featured && (
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {currentPost.title}
              </h1>

              {/* Meta Information */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  <span>{currentPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>{new Date(currentPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <span>{currentPost.readTime}</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-muted-foreground mb-6">
                {currentPost.excerpt}
              </p>

              {/* Tags */}
              {currentPost.tags && currentPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentPost.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-foreground rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <FiShare2 className="w-4 h-4" />
                  Share
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  <FiBookmark className="w-4 h-4" />
                  Bookmark
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  <FiHeart className="w-4 h-4" />
                  Like
                </motion.button>
              </div>
            </motion.article>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-xl border border-border p-8 mb-8"
            >
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {currentPost.content}
                </div>
              </div>
            </motion.div>

            {/* Author Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-8 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">About the Author</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <FiUser className="w-8 h-8 text-primary/50" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{currentPost.author}</h3>
                  <p className="text-muted-foreground">
                    Passionate about web development, AI integration, and sharing knowledge with the community.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Related Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-xl border border-border p-8"
            >
              <h2 className="text-xl font-semibold mb-6">Related Articles</h2>
              <div className="text-center py-8">
                <FiTag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  More articles coming soon! Stay tuned for more insights and tutorials.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="container-max px-4 pb-16"
        >
          <div className="max-w-2xl mx-auto p-8 bg-card rounded-xl border border-border text-center">
            <h2 className="text-2xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Get notified when I publish new articles about web development, AI integration, and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
