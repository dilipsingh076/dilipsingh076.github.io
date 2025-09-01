'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiEdit, FiTrash2, FiEye, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogPosts, deleteBlogPost } from '@/store/slices/blogSlice';

export default function ManageBlogPage(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state: any) => state.blog);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const categories = ['All', 'Architecture', 'AI/ML', 'Performance', 'Real-time', 'Next.js', 'Trends', 'Tutorial', 'Case Study'];

  useEffect(() => {
    dispatch(fetchBlogPosts({}));
  }, [dispatch]);

  const handleDelete = async (postId: string) => {
    try {
      await dispatch(deleteBlogPost(postId)).unwrap();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete blog post:', error);
    }
  };

  const filteredPosts = posts.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back to Blog
                </motion.button>
              </Link>
              
              <Link href="/blog/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  Create New Post
                </motion.button>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Manage <span className="gradient-text">Blog Posts</span>
            </h1>
            <p className="text-muted-foreground">
              Edit, delete, and manage your blog posts.
            </p>
          </div>
        </motion.div>

        <div className="container-max px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-6 mb-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Posts List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading posts...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={() => dispatch(fetchBlogPosts({}))}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <FiFilter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No posts found</h3>
                  <p className="text-muted-foreground mb-6">
                    No posts match your current filters. Try adjusting your search or category selection.
                  </p>
                  <Link href="/blog/create">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                      Create Your First Post
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post: any, index: number) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="bg-card rounded-xl border border-border p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                              {post.category}
                            </span>
                            {post.featured && (
                              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full font-medium">
                                Featured
                              </span>
                            )}
                            {!post.published && (
                              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-full font-medium">
                                Draft
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Link href={`/blog/${post.slug}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                              title="View Post"
                            >
                              <FiEye className="w-4 h-4" />
                            </motion.button>
                          </Link>
                          
                          <Link href={`/blog/edit/${post.slug}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                              title="Edit Post"
                            >
                              <FiEdit className="w-4 h-4" />
                            </motion.button>
                          </Link>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDeleteConfirm(post.id)}
                            className="p-2 text-red-500 hover:text-red-600 transition-colors"
                            title="Delete Post"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
