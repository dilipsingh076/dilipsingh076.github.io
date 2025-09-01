import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSkills } from '@/store/slices/skillSlice';

export const useSkills = () => {
  const dispatch = useAppDispatch();
  const { skills, loading, error } = useAppSelector((state) => state.skills);

  useEffect(() => {
    dispatch(fetchSkills({}));
  }, [dispatch]);

  return {
    skills,
    loading,
    error,
    refetch: () => dispatch(fetchSkills({}))
  };
};

