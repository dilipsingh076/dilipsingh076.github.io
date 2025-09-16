import { useState, useEffect, useRef } from 'react';
import { SkillsApiResponse } from '@/components/skills/constants';

// Global cache to prevent multiple API calls
let skillsCache: SkillsApiResponse | null = null;
let isLoading = false;
const subscribers = new Set<() => void>();

export function useSkillsData() {
  const [data, setData] = useState<SkillsApiResponse | null>(skillsCache);
  const [loading, setLoading] = useState(isLoading);
  const [error, setError] = useState<string | null>(null);
  const isSubscribed = useRef(false);

  useEffect(() => {
    // Subscribe to updates
    if (!isSubscribed.current) {
      isSubscribed.current = true;
      subscribers.add(() => {
        setData(skillsCache);
        setLoading(isLoading);
      });
    }

    // If we already have cached data, use it
    if (skillsCache) {
      setData(skillsCache);
      setLoading(false);
      return;
    }

    // If already loading, just wait
    if (isLoading) {
      setLoading(true);
      return;
    }

    // Start fetching
    const fetchSkills = async () => {
      try {
        isLoading = true;
        setLoading(true);
        setError(null);

        // Notify all subscribers that we're loading
        subscribers.forEach(callback => callback());

        const response = await fetch('/api/skills');
        
        if (response.ok) {
          const apiData: SkillsApiResponse = await response.json();
          skillsCache = apiData;
          
          // Notify all subscribers with new data
          subscribers.forEach(callback => callback());
        } else {
          throw new Error('Failed to fetch skills');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch skills';
        setError(errorMessage);
        console.error('Error fetching skills:', error);
      } finally {
        isLoading = false;
        setLoading(false);
        
        // Notify all subscribers that loading is complete
        subscribers.forEach(callback => callback());
      }
    };

    fetchSkills();

    // Cleanup subscription
    return () => {
      if (isSubscribed.current) {
        isSubscribed.current = false;
        subscribers.delete(() => {
          setData(skillsCache);
          setLoading(isLoading);
        });
      }
    };
  }, []);

  return { data, loading, error };
}

// Function to clear cache (useful for admin operations)
export function clearSkillsCache() {
  skillsCache = null;
  isLoading = false;
  subscribers.forEach(callback => callback());
}
