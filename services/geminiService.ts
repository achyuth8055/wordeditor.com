
import { GoogleGenAI } from "@google/genai";

// Use VITE_DEEPSEEK_API_KEY or fallback
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const callGemini = async (prompt: string): Promise<string> => {
    if (!API_KEY || !ai) {
        return Promise.reject(new Error("API key is not configured."));
    }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI service.");
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  const prompt = `Summarize the following text concisely:\n\n---\n\n${text}`;
  return callGemini(prompt);
};

export const translateText = async (text: string, language: string): Promise<string> => {
  const prompt = `Translate the following text to ${language}:\n\n---\n\n${text}`;
  return callGemini(prompt);
};

export const academicMode = async (text: string): Promise<string> => {
  const prompt = `Rewrite the following text in a formal, academic style. Improve the vocabulary, sentence structure, and overall clarity for a scholarly audience:\n\n---\n\n${text}`;
  return callGemini(prompt);
};
