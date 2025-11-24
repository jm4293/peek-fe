import { GoogleGenerativeAI } from '@google/generative-ai';

import { buildPromptFromMessages } from './prompts';
import type { ChatMessage } from './types';

// const DEFAULT_MODEL = 'gemini-2.5-flash';
const DEFAULT_MODEL = 'gemini-2.5-flash-lite';

export const requestGeminiStockAnswer = async (messages: ChatMessage[]) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API 키가 설정되어 있지 않습니다.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel(
    {
      model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    },
    { apiVersion: 'v1beta' },
  );

  const prompt = buildPromptFromMessages(messages);

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    if (result.response.promptFeedback?.blockReason) {
      throw new Error('Gemini 안전성 정책에 따라 요청이 차단되었습니다.');
    }

    let text: string | undefined;

    try {
      text = result.response.text();
    } catch {
      text = undefined;
    }

    const trimmed = text?.trim();
    if (trimmed) {
      return trimmed;
    }

    const candidateParts =
      result.response.candidates?.flatMap(
        (candidate) =>
          candidate.content.parts
            ?.map((part) => {
              if ('text' in part && typeof part.text === 'string') {
                return part.text;
              }

              return '';
            })
            .filter((partText) => partText && partText.length > 0) ?? [],
      ) ?? [];

    const candidateText = candidateParts.join('\n').trim();

    if (candidateText && candidateText.length > 0) {
      return candidateText;
    }

    const finishReason = result.response.candidates?.[0]?.finishReason;
    if (finishReason === 'SAFETY') {
      throw new Error('Gemini 안전성 필터에 의해 응답이 차단되었습니다.');
    }

    throw new Error('Gemini 응답이 비어 있습니다. 잠시 후 다시 시도해 주세요.');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gemini API 요청 실패: ${error.message}`);
    }

    throw error;
  }
};

export type { ChatMessage } from './types';
