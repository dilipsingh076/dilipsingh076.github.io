import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchBlogPosts, 
  fetchFeaturedPosts, 
  setSelectedCategory, 
  setSearchQuery, 
  setCurrentPage 
} from '@/store/slices/blogSlice';

export const useBlog = () => {
  const dispatch = useAppDispatch();
  const { 
    posts, 
    featuredPosts, 
    loading, 
    error, 
    totalPosts, 
    currentPage, 
    postsPerPage, 
    categories: availableCategories, 
    selectedCategory, 
    searchQuery 
  } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchFeaturedPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBlogPosts({
      page: currentPage,
      category: selectedCategory,
      search: searchQuery,
    }));
  }, [dispatch, currentPage, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return {
    posts,
    featuredPosts,
    loading,
    error,
    totalPosts,
    currentPage,
    postsPerPage,
    availableCategories,
    selectedCategory,
    searchQuery,
    totalPages,
    handleCategoryChange,
    handleSearchChange,
    handlePageChange,
    refetch: () => dispatch(fetchBlogPosts({}))
  };
};

