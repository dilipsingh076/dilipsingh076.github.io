import { FiFilter } from 'react-icons/fi';

export const EmptyState = () => {
  return (
    <div className="text-center py-16">
      <FiFilter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
      <p className="text-muted-foreground">
        No articles match your current filters. Try adjusting your search or category selection.
      </p>
    </div>
  );
};


