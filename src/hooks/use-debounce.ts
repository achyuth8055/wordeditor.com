import { useCallback, useEffect, useRef } from 'react';

/**
 * @function useDebounce
 * @description Creates a debounced function that only executes the last call within the specified delay time
 * @param {T} callback - The callback function to be debounced
 * @param {number} delay - Debounce delay time (milliseconds)
 * @returns {(...args: Parameters<T>) => void} The debounced function
 * @example
 * ```tsx
 * const debouncedFn = useDebounce((value: string) => {
 *   console.log(value);
 * }, 500);
 * ```
 */
export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
