import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProjects } from '@/store/slices/projectSlice';

export const useProjects = () => {
  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [dispatch]);

  return {
    projects,
    loading,
    error,
    refetch: () => dispatch(fetchProjects({}))
  };
};

