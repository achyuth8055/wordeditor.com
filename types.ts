
export enum ActiveTab {
  AI_TOOLS = 'AI_TOOLS',
  TYPING_TEST = 'TYPING_TEST',
  EXPORT = 'EXPORT',
}

export interface TextAnalysis {
  words: number;
  characters: number;
  twitterCharsLeft: number;
  facebookCharsLeft: number;
  googleCharsLeft: number;
}
