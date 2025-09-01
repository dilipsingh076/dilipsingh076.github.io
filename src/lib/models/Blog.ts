import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  slug: string;
  featured: boolean;
  tags: string[];
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String,
    trim: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
}, {
  timestamps: false, // We're managing timestamps manually
});

// Create indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ featured: 1 });
BlogSchema.index({ published: 1 });
BlogSchema.index({ tags: 1 });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
