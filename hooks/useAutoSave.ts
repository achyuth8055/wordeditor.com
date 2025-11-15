
import { useState, useEffect } from 'react';

export const useAutoSave = (text: string, delay: number) => {
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaving(true);
    const handler = setTimeout(() => {
      localStorage.setItem('autosaved-text', text);
      setIsSaving(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return { isSaving };
};
