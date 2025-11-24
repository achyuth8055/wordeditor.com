import { useRef } from 'react';
import { useQuery } from 'convex/react';

type Query = typeof useQuery;

/**
 * https://stack.convex.dev/help-my-app-is-overreacting#impacting-how-the-querys-reacting
 *
 * useQuery returns undefined on initial execution
 */
export const useStableQuery: Query = (query, ...args) => {
  const result = useQuery(query, ...args);
  const stored = useRef(result);

  /**
   * After the first render, stored.current only changes when we update it
   * If result is undefined, new data is loading and we shouldn't do anything
   */
  if (result !== undefined) {
    // If there's a newly loaded result, store it using the ref
    stored.current = result;
  }

  // Undefined on first load, old data during reload, new data after loading completes
  return stored.current;
};

/**
 * Current issues with useQuery:
 *
 * - Auto-subscribes to data; when data updates, useQuery automatically re-executes
 * - When data updates > useQuery re-executes > component re-renders > useQuery returns undefined > component re-renders
 *    After querying the latest data, useQuery returns the new data, component re-renders
 *
 * This causes a loading screen flashing problem
 *
 */
