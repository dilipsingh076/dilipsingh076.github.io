'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiEye, FiEyeOff, FiPlus, FiX } from 'react-icons/fi';
import { useAppDispatch } from '@/store/hooks';
import { createBlogPost } from '@/store/slices/blogSlice';
import { BlogFormData } from '../types';

const categories = ['Architecture', 'AI/ML', 'Performance', 'Real-time', 'Next.js', 'Trends', 'Tutorial', 'Case Study'];

export default function CreateBlogPage(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [newTag, setNewTag] = useState('');

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '1 min read',
    category: '',
    author: '',
    slug: '',
    featured: false,
    tags: [],
    image: '',
    published: true,
  });

  const handleInputChange = (field: keyof BlogFormData, value: string | boolean | string[]) => {
    setFormData((prev: BlogFormData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter((tag: string) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Calculate read time
      const readTime = calculateReadTime(formData.content);

      const blogData = {
        ...formData,
        slug,
        readTime,
      };

      await dispatch(createBlogPost(blogData)).unwrap();
      router.push('/blog');
    } catch (error) {
      console.error('Failed to create blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

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
              
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  {showPreview ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </motion.button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Create New <span className="gradient-text">Blog Post</span>
            </h1>
            <p className="text-muted-foreground">
              Share your thoughts, experiences, and insights with the community.
            </p>
          </div>
        </motion.div>

        <div className="container-max px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="Enter blog post title"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="Enter author name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                      placeholder="Brief description of the blog post"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Content</h2>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-2">
                    Blog Content *
                  </label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                    placeholder="Write your blog post content here..."
                    rows={15}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Estimated read time: {calculateReadTime(formData.content)}
                  </p>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Tags</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="Add a tag"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddTag}
                      className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-primary/70 transition-colors"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Featured Post</label>
                      <p className="text-sm text-muted-foreground">
                        Mark this post as featured to highlight it on the blog page
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Published</label>
                      <p className="text-sm text-muted-foreground">
                        Publish this post immediately or save as draft
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => handleInputChange('published', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Preview */}
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Preview</h2>
                  
                  <div className="prose prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-4">{formData.title || 'Untitled Post'}</h1>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>By {formData.author || 'Unknown Author'}</span>
                      <span>•</span>
                      <span>{new Date().toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{calculateReadTime(formData.content)}</span>
                      {formData.category && (
                        <>
                          <span>•</span>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {formData.category}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-lg text-muted-foreground mb-6">{formData.excerpt}</p>

                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-secondary text-foreground rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{formData.content}</div>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-end gap-4"
              >
                <Link href="/blog">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </motion.button>
                </Link>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      Create Post
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
