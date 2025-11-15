
const API_KEY = (process.env as any).DEEPSEEK_API_KEY || (import.meta as any).env.VITE_DEEPSEEK_API_KEY;
const API_BASE = 'https://api.deepseek.com/chat/completions';
const REQUEST_TIMEOUT = 30000; // 30 seconds

if (!API_KEY) {
  console.warn("DEEPSEEK_API_KEY is not set. AI features will not work.");
}

interface DeepSeekMessage {
  role: 'user' | 'assistant';
  content: string;
}

const callDeepSeek = async (prompt: string, maxRetries = 2): Promise<string> => {
  if (!API_KEY) {
    throw new Error("DeepSeek API key is not configured. Please set DEEPSEEK_API_KEY in your environment variables.");
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ] as DeepSeekMessage[],
          temperature: 0.7,
          max_tokens: 2000,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        
        if (response.status === 429 && attempt < maxRetries) {
          // Rate limited - wait and retry
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }

        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your DEEPSEEK_API_KEY.");
        }

        throw new Error(
          error.error?.message ||
          `API request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid API response');
      }

      return data.choices[0].message.content;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        throw new Error('Request timeout. Please try again.');
      }

      if (attempt === maxRetries) {
        console.error("Error calling DeepSeek API:", error);
        throw error;
      }

      // Retry on other errors
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  throw new Error('Failed to get response from AI service after retries.');
};

export const formatTextByLevel = async (
  text: string,
  level: 'school' | 'college' | 'professional' | 'simple'
): Promise<string> => {
  const levelDescriptions = {
    school: 'suitable for high school students (grades 9-12)',
    college: 'suitable for college/university students with academic vocabulary',
    professional: 'suitable for professional business communications',
    simple: 'simple and easy to understand for general audiences',
  };

  const prompt = `Rewrite the following text to be ${levelDescriptions[level]}. Maintain the original meaning but adjust the vocabulary, sentence structure, and complexity accordingly.

Text to rewrite:
${text}

Please provide only the rewritten text without any explanations.`;

  return callDeepSeek(prompt);
};

export const analyzeReadability = async (text: string): Promise<{
  score: number;
  grade_level: string;
  description: string;
}> => {
  const prompt = `Analyze the readability of the following text. Provide a readability score (0-100, where 100 is most readable), estimate the grade level required to understand it, and a brief description.

Text to analyze:
${text}

Respond ONLY in JSON format, nothing else:
{
  "score": 75,
  "grade_level": "High School (9-12)",
  "description": "Clear and moderately complex text suitable for high school students."
}`;

  try {
    const response = await callDeepSeek(prompt);
    // Extract JSON from response - handle potential markdown code blocks
    const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        score: typeof parsed.score === 'number' ? parsed.score : 75,
        grade_level: parsed.grade_level || 'Unknown',
        description: parsed.description || 'Readability analysis completed.',
      };
    }
    
    // Fallback if JSON parsing fails
    return {
      score: 75,
      grade_level: 'High School (9-12)',
      description: 'Unable to parse detailed analysis. Please try again.',
    };
  } catch (error: any) {
    console.error("Error analyzing readability:", error);
    // Return a default response instead of throwing
    return {
      score: 70,
      grade_level: 'High School (9-12)',
      description: 'Readability analysis unavailable. Please check your API key.',
    };
  }
};

export const improveGrammar = async (text: string): Promise<string> => {
  const prompt = `Correct any grammar, spelling, and punctuation errors in the following text. Maintain the original meaning and tone.

Text to correct:
${text}

Please provide only the corrected text without any explanations or comments.`;

  return callDeepSeek(prompt);
};

export const generateOutline = async (text: string): Promise<string> => {
  const prompt = `Create a detailed outline based on the following text. Use a hierarchical structure with main points and sub-points.

Text:
${text}

Please provide a clear outline format.`;

  return callDeepSeek(prompt);
};

export const detectTone = async (text: string): Promise<{
  tone: string;
  confidence: number;
  suggestions: string[];
}> => {
  const prompt = `Analyze the tone of the following text and suggest ways to adjust it if needed.

Text:
${text}

Respond ONLY in JSON format, nothing else:
{
  "tone": "formal/informal/neutral/etc",
  "confidence": 85,
  "suggestions": ["suggestion 1", "suggestion 2"]
}`;

  try {
    const response = await callDeepSeek(prompt);
    // Extract JSON from response - handle potential markdown code blocks
    const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        tone: parsed.tone || 'Neutral',
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 75,
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      };
    }
    
    // Fallback if JSON parsing fails
    return {
      tone: 'Neutral',
      confidence: 60,
      suggestions: ['Unable to generate specific suggestions. Try with more text.'],
    };
  } catch (error: any) {
    console.error("Error detecting tone:", error);
    // Return a default response instead of throwing
    return {
      tone: 'Unknown',
      confidence: 0,
      suggestions: ['Tone detection unavailable. Please check your API key.'],
    };
  }
};

export const paraphraseText = async (text: string): Promise<string> => {
  const prompt = `Paraphrase the following text while maintaining its meaning and key points. Use different words and sentence structures.

Text:
${text}

Please provide only the paraphrased text.`;

  return callDeepSeek(prompt);
};
