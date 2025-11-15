
import { useMemo } from 'react';
import { TextAnalysis } from '../types';

const TWITTER_LIMIT = 280;
const FACEBOOK_LIMIT = 250; // A general recommendation
const GOOGLE_META_LIMIT = 300;

export const useTextAnalysis = (text: string): TextAnalysis => {
  return useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).filter(Boolean).length : 0;
    const characters = text.length;

    return {
      words,
      characters,
      twitterCharsLeft: TWITTER_LIMIT - characters,
      facebookCharsLeft: FACEBOOK_LIMIT - characters,
      googleCharsLeft: GOOGLE_META_LIMIT - characters,
    };
  }, [text]);
};
