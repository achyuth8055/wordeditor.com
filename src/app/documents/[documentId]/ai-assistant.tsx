'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Wand2, Languages, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AiAssistantProps {
  onInsertContent: (content: string) => void;
  selectedText?: string;
}

type AiAction = 'improve' | 'expand' | 'shorten' | 'translate' | 'summarize' | 'tone' | 'grammar';
type Tone = 'professional' | 'casual' | 'friendly' | 'formal' | 'persuasive';
type Language = 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh' | 'ar' | 'hi';

export const AiAssistant = ({ onInsertContent, selectedText }: AiAssistantProps) => {
  const [action, setAction] = useState<AiAction>('improve');
  const [tone, setTone] = useState<Tone>('professional');
  const [language, setLanguage] = useState<Language>('es');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');

  // Simulated AI processing (replace with actual API calls)
  const processWithAi = async () => {
    if (!selectedText && !customPrompt) {
      toast.error('Please select text in the editor or enter a custom prompt');
      return;
    }

    setIsProcessing(true);
    setResult('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      let generatedContent = '';

      switch (action) {
        case 'improve':
          generatedContent = improveText(selectedText || customPrompt);
          break;
        case 'expand':
          generatedContent = expandText(selectedText || customPrompt);
          break;
        case 'shorten':
          generatedContent = shortenText(selectedText || customPrompt);
          break;
        case 'translate':
          generatedContent = translateText(selectedText || customPrompt, language);
          break;
        case 'summarize':
          generatedContent = summarizeText(selectedText || customPrompt);
          break;
        case 'tone':
          generatedContent = adjustTone(selectedText || customPrompt, tone);
          break;
        case 'grammar':
          generatedContent = fixGrammar(selectedText || customPrompt);
          break;
        default:
          generatedContent = selectedText || customPrompt;
      }

      setResult(generatedContent);
      toast.success('AI processing complete!');
    } catch (error) {
      toast.error('AI processing failed. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock AI functions (replace with actual API calls to OpenAI, Claude, Gemini, etc.)
  const improveText = (text: string) => {
    return `Enhanced version: ${text}\n\nThis text has been improved for clarity, grammar, and readability. The sentence structure has been optimized while maintaining the original meaning.`;
  };

  const expandText = (text: string) => {
    return `${text}\n\nAdditional context and details have been added to provide a more comprehensive explanation. This expanded version includes supporting information, examples, and elaboration on key points to enhance understanding and engagement.`;
  };

  const shortenText = (text: string) => {
    const words = text.split(' ');
    const shortened = words.slice(0, Math.ceil(words.length / 2)).join(' ');
    return `${shortened}... [Condensed version maintaining key points]`;
  };

  const translateText = (text: string, targetLang: Language) => {
    const langNames: Record<Language, string> = {
      es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese',
      ja: 'Japanese', ko: 'Korean', zh: 'Chinese', ar: 'Arabic', hi: 'Hindi'
    };
    return `[Translated to ${langNames[targetLang]}]\n\n${text}\n\n(This is a simulated translation. Integrate with Google Translate API, DeepL, or GPT-4 for actual translations)`;
  };

  const summarizeText = (text: string) => {
    return `📝 Summary:\n\nKey Points:\n• Main idea extracted from the text\n• Important details condensed\n• Essential information preserved\n\nThis summary captures the core message in a concise format.`;
  };

  const adjustTone = (text: string, targetTone: Tone) => {
    return `[Adjusted to ${targetTone} tone]\n\n${text}\n\nThe tone has been modified to match a ${targetTone} style while preserving the original message and intent.`;
  };

  const fixGrammar = (text: string) => {
    return `✓ Grammar checked and corrected:\n\n${text}\n\n• Spelling errors fixed\n• Punctuation improved\n• Sentence structure optimized\n• Grammar issues resolved`;
  };

  const insertIntoEditor = () => {
    if (result) {
      onInsertContent(result);
      toast.success('Content inserted into editor');
    }
  };

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <CardTitle className="dark:text-white">AI Writing Assistant</CardTitle>
        </div>
        <CardDescription className="dark:text-gray-300">
          {selectedText ? `${selectedText.length} characters selected` : 'Select text or enter custom prompt'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Action Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-white">AI Action</label>
          <Select value={action} onValueChange={(value) => setAction(value as AiAction)}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
              <SelectItem value="improve" className="dark:text-white">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Improve Writing
                </div>
              </SelectItem>
              <SelectItem value="expand" className="dark:text-white">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Expand Content
                </div>
              </SelectItem>
              <SelectItem value="shorten" className="dark:text-white">Shorten Text</SelectItem>
              <SelectItem value="translate" className="dark:text-white">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Translate
                </div>
              </SelectItem>
              <SelectItem value="summarize" className="dark:text-white">Summarize</SelectItem>
              <SelectItem value="tone" className="dark:text-white">Adjust Tone</SelectItem>
              <SelectItem value="grammar" className="dark:text-white">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Fix Grammar
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional Options */}
        {action === 'tone' && (
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-white">Target Tone</label>
            <Select value={tone} onValueChange={(value) => setTone(value as Tone)}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                <SelectItem value="professional" className="dark:text-white">Professional</SelectItem>
                <SelectItem value="casual" className="dark:text-white">Casual</SelectItem>
                <SelectItem value="friendly" className="dark:text-white">Friendly</SelectItem>
                <SelectItem value="formal" className="dark:text-white">Formal</SelectItem>
                <SelectItem value="persuasive" className="dark:text-white">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {action === 'translate' && (
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-white">Target Language</label>
            <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                <SelectItem value="es" className="dark:text-white">Spanish</SelectItem>
                <SelectItem value="fr" className="dark:text-white">French</SelectItem>
                <SelectItem value="de" className="dark:text-white">German</SelectItem>
                <SelectItem value="it" className="dark:text-white">Italian</SelectItem>
                <SelectItem value="pt" className="dark:text-white">Portuguese</SelectItem>
                <SelectItem value="ja" className="dark:text-white">Japanese</SelectItem>
                <SelectItem value="ko" className="dark:text-white">Korean</SelectItem>
                <SelectItem value="zh" className="dark:text-white">Chinese</SelectItem>
                <SelectItem value="ar" className="dark:text-white">Arabic</SelectItem>
                <SelectItem value="hi" className="dark:text-white">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Custom Prompt */}
        {!selectedText && (
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-white">Custom Prompt</label>
            <Textarea
              placeholder="Enter text or describe what you want to generate..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        )}

        {/* Process Button */}
        <Button 
          onClick={processWithAi} 
          disabled={isProcessing}
          className="w-full bg-purple-500 hover:bg-purple-600"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate with AI
            </>
          )}
        </Button>

        {/* Result Display */}
        {result && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium dark:text-white">AI Result</label>
              <Badge variant="secondary" className="dark:bg-purple-500/20 dark:text-purple-300">
                Ready
              </Badge>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
              <p className="text-sm whitespace-pre-wrap dark:text-white">{result}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={insertIntoEditor} className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                Insert into Editor
              </Button>
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  toast.success('Copied to clipboard');
                }}
                variant="outline"
                className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
              >
                Copy
              </Button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> This is a demo with simulated AI responses. Integrate with OpenAI GPT-4, Anthropic Claude, or Google Gemini APIs for production use.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
