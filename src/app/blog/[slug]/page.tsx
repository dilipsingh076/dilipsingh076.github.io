import { getPostBySlug, BLOG_POSTS } from '@/components/blog/constants';
import { BlogDetailClient } from '@/components/blog/BlogDetailClient';

// Generate static params for all blog posts
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps): JSX.Element {
  const slug = params.slug;
  const currentPost = getPostBySlug(slug);

  return <BlogDetailClient post={currentPost || null} />;
}
