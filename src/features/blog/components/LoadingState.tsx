'use client';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading blog posts..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
      <p className="text-lg text-gray-600">{message}</p>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-3"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
