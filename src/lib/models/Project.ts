import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  githubUrl: {
    type: String,
    required: true,
    trim: true,
  },
  liveUrl: {
    type: String,
    required: true,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ title: 1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
