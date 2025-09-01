'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useBlog } from '@/hooks/useBlog';
import { 
  BlogCard, 
  BlogFilters, 
  Pagination, 
  LoadingState, 
  ErrorState, 
  EmptyState 
} from '@/features/blog';
import { Button } from '@/shared/components';
import { Logo } from '@/components/ui/logo';

const categories = ['All', 'Architecture', 'AI/ML', 'Performance', 'Real-time', 'Next.js', 'Trends'];

export default function BlogPage(): JSX.Element {
  const {
    posts,
    featuredPosts,
    loading,
    error,
    selectedCategory,
    searchQuery,
    totalPages,
    currentPage,
    handleCategoryChange,
    handleSearchChange,
    handlePageChange,
    refetch
  } = useBlog();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-max px-4 py-16 text-center"
        >
          <div className="flex justify-center mb-6">
            <Logo animate={true} size="xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog & <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Sharing my thoughts, experiences, and insights on modern web development, 
            AI integration, and best practices in software engineering.
          </p>

        </motion.div>

        {/* Search and Filter */}
        <BlogFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />

        {/* Featured Post */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="container-max px-4 mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="gradient-text">Featured</span> Article
            </h2>
            
            <div className="max-w-4xl mx-auto">
              {featuredPosts.map((post: any, index: number) => (
                <BlogCard
                  key={post.id}
                  post={{ ...post, isFeatured: true }}
                  index={index}
                  variant="featured"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="container-max px-4 pb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={refetch} />
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any, index: number) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={index}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="container-max px-4 pb-16 text-center"
        >
          <div className="max-w-2xl mx-auto p-8 bg-card rounded-xl border border-border">
            <h2 className="text-2xl font-bold mb-4">
              Have a topic in mind?
            </h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m always looking for new topics to write about. Let me know what you&apos;d like to learn more about!
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Suggest a Topic
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
