# Optimized Folder Structure

This document outlines the complete folder structure for the Next.js application with optimized code organization, custom hooks, and feature-based architecture.

## 📁 Root Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Legacy components (to be migrated)
├── constants/              # Application constants
├── features/               # Feature-based components
├── hooks/                  # Custom React hooks
├── lib/                    # Library configurations
├── services/               # API and external services
├── shared/                 # Shared/reusable components
├── store/                  # Redux store and slices
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## 🎣 Hooks (`src/hooks/`)

Custom React hooks for managing application state and logic:

```
hooks/
├── index.ts               # Export all hooks
├── useBlog.ts             # Blog functionality hook
├── useContact.ts          # Contact form hook
├── useProjects.ts         # Projects data hook
├── useSkills.ts           # Skills data hook
└── useScroll.ts           # Scroll behavior hook
```

### Hook Features:
- **useBlog**: Manages blog posts, filtering, pagination, and search
- **useContact**: Handles contact form state and submission
- **useProjects**: Fetches and manages project data
- **useSkills**: Manages skills data
- **useScroll**: Tracks scroll position and provides scroll utilities

## 🏗️ Features (`src/features/`)

Feature-based component organization:

```
features/
├── blog/                  # Blog feature
│   ├── components/        # Blog-specific components
│   │   ├── BlogCard.tsx
│   │   ├── BlogFilters.tsx
│   │   ├── Pagination.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   └── index.ts          # Export blog components
├── contact/              # Contact feature (future)
├── projects/             # Projects feature (future)
└── skills/               # Skills feature (future)
```

### Blog Components:
- **BlogCard**: Reusable blog post card component
- **BlogFilters**: Search and category filtering
- **Pagination**: Page navigation component
- **LoadingState**: Loading spinner and message
- **ErrorState**: Error display with retry functionality
- **EmptyState**: Empty state display

## 🔧 Shared Components (`src/shared/`)

Reusable UI components:

```
shared/
├── components/
│   ├── Button.tsx        # Reusable button component
│   ├── Input.tsx         # Form input component
│   ├── Textarea.tsx      # Textarea component
│   ├── Card.tsx          # Card container component
│   └── index.ts          # Export shared components
└── layouts/              # Layout components (future)
```

### Shared Component Features:
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Input**: Form input with validation states
- **Textarea**: Multi-line text input
- **Card**: Container component with padding options

## 🛠️ Services (`src/services/`)

API and external service management:

```
services/
├── api.ts                # Base API service class
├── blogService.ts        # Blog API operations
├── contactService.ts     # Contact API operations
└── index.ts              # Export all services
```

### Service Features:
- **api.ts**: Base HTTP client with common methods
- **blogService.ts**: Blog CRUD operations
- **contactService.ts**: Contact form submission and management

## 📦 Utils (`src/utils/`)

Utility functions organized by category:

```
utils/
├── date.ts               # Date formatting utilities
├── validation.ts         # Form validation functions
├── string.ts             # String manipulation utilities
└── index.ts              # Export all utilities
```

### Utility Functions:
- **date.ts**: Date formatting, relative time calculation
- **validation.ts**: Email, URL, phone validation
- **string.ts**: Text truncation, slugification, capitalization

## 🎯 App Router (`src/app/`)

Next.js App Router pages with optimized structure:

```
app/
├── page.tsx              # Home page
├── layout.tsx            # Root layout
├── globals.css           # Global styles
├── about/
│   └── page.tsx          # About page
├── blog/
│   ├── page.tsx          # Blog listing (optimized)
│   ├── [slug]/
│   │   └── page.tsx      # Individual blog post
│   ├── create/
│   │   └── page.tsx      # Create blog post
│   ├── edit/
│   │   └── [slug]/
│   │       └── page.tsx  # Edit blog post
│   └── manage/
│       └── page.tsx      # Blog management
├── contact/
│   └── page.tsx          # Contact page
├── projects/
│   ├── page.tsx          # Projects listing
│   └── [id]/
│       └── page.tsx      # Individual project
├── skills/
│   └── page.tsx          # Skills page
└── admin/                # Admin dashboard
    ├── layout.tsx
    ├── page.tsx
    ├── blogs/
    ├── contacts/
    ├── projects/
    └── skills/
```

## 🔄 Migration Benefits

### Before (Monolithic):
- Large page components with mixed concerns
- Repeated code across components
- Hard to test and maintain
- No separation of business logic

### After (Optimized):
- **Separation of Concerns**: UI, logic, and data separated
- **Reusability**: Components and hooks can be reused
- **Testability**: Isolated components and hooks are easier to test
- **Maintainability**: Clear structure makes code easier to maintain
- **Type Safety**: Proper TypeScript types throughout
- **Performance**: Optimized re-renders with custom hooks

## 🚀 Usage Examples

### Using Custom Hooks:
```typescript
// In a component
import { useBlog } from '@/hooks/useBlog';

export default function BlogPage() {
  const {
    posts,
    loading,
    error,
    handleSearchChange,
    handleCategoryChange
  } = useBlog();
  
  // Component logic here
}
```

### Using Shared Components:
```typescript
import { Button, Input, Card } from '@/shared/components';

export default function ContactForm() {
  return (
    <Card>
      <Input label="Name" placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Using Services:
```typescript
import { blogService } from '@/services';

// Fetch blog posts
const posts = await blogService.getPosts({ page: 1, category: 'Tech' });
```

## 📋 Next Steps

1. **Migrate Remaining Pages**: Apply the same pattern to other pages
2. **Create Feature Folders**: Organize projects, skills, and contact features
3. **Add Tests**: Create unit tests for hooks and components
4. **Performance Optimization**: Implement React.memo and useMemo where needed
5. **Error Boundaries**: Add error boundaries for better error handling
6. **Loading States**: Implement skeleton loading components
7. **Accessibility**: Add ARIA labels and keyboard navigation

This structure provides a scalable, maintainable, and performant foundation for the application.


