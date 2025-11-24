import { useRef } from 'react';
import { usePaginatedQuery } from 'convex/react';

type Query = typeof usePaginatedQuery;

export const useStablePaginatedQuery: Query = (query, ...args) => {
  const result = usePaginatedQuery(query, ...args);
  result.status;
  const stored = useRef(result);

  /**
   * If new data is still loading, wait and don't do anything
   * If data has finished loading, store it using the ref
   */
  if (result.status !== 'LoadingMore') {
    stored.current = result;
  }

  return stored.current;
};
