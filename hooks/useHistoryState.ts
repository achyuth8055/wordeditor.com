import { useState, useCallback } from 'react';

type HistoryStateInitializer<T> = T | (() => T);

export const useHistoryState = <T>(initialState: HistoryStateInitializer<T>) => {
  const [history, setHistory] = useState<T[]>(() => {
    const resolvedInitialState =
      initialState instanceof Function ? initialState() : initialState;
    return [resolvedInitialState];
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex];

  const setState = useCallback((newState: T) => {
    // If the new state is the same as the current one, do nothing.
    if (newState === history[currentIndex]) {
      return;
    }

    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [currentIndex, history]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, history.length]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return { state, setState, undo, redo, canUndo, canRedo };
};
