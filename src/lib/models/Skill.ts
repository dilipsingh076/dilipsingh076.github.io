import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'database', 'devops', 'tools'],
  },
  proficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
SkillSchema.index({ category: 1 });
SkillSchema.index({ proficiency: -1 });
SkillSchema.index({ name: 1 });

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
