'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import type { ChatMessage } from '@/services/ai/types';

import ChatInput from './components/ChatInput';
import ChatMessageBubble, { type ChatMessageWithMeta } from './components/ChatMessage';
import SuggestionChips from './components/SuggestionChips';

const SUGGESTIONS = [
  '삼성전자 최근 실적과 향후 전망 알려줘',
  'LG에너지솔루션에 투자할 때 주의할 점은 뭐야?',
  '2차전지 관련 국내 대장주 후보 정리해줘',
];

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const createMessage = (
  role: ChatMessage['role'],
  content: string,
  status?: ChatMessageWithMeta['status'],
): ChatMessageWithMeta => ({
  id: generateId(),
  role,
  content,
  status,
  createdAt: new Date().toISOString(),
});

const INITIAL_MESSAGE = createMessage(
  'assistant',
  `안녕하세요! Gemini 모델을 활용한 국내 주식 AI 도우미입니다.

- 종목 기본 정보, 최근 이슈, 참고 리포트 등을 요약해 드릴 수 있어요.
- 실시간 시세나 확정된 데이터는 제공되지 않으니 반드시 증권사 HTS/MTS 등에서 최종 확인해 주세요.
- 투자 자문이 아닌 참고용 정보라는 점을 유의해 주세요!

무엇이 궁금하신가요?`,
);

const AiSearchPage = () => {
  const [messages, setMessages] = useState<ChatMessageWithMeta[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const callAiApi = useCallback(
    async (prompt: string) => {
      const userMessage = createMessage('user', prompt);
      const pendingAssistantMessage = createMessage('assistant', '', 'pending');

      const requestPayload: { messages: ChatMessage[] } = {
        messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
      };

      setMessages((prev) => [...prev, userMessage, pendingAssistantMessage]);
      setIsLoading(true);

      try {
        const response = await fetch('/api/ai-search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody.message || 'AI 응답을 받지 못했습니다.');
        }

        const data = (await response.json()) as { content?: string };
        const content = data.content?.trim();

        setMessages((prev) =>
          prev.map((message) =>
            message.id === pendingAssistantMessage.id
              ? {
                  ...message,
                  content:
                    content && content.length > 0
                      ? content
                      : '답변을 정상적으로 가져오지 못했어요. 잠시 후 다시 시도해 주세요.',
                  status: 'done',
                }
              : message,
          ),
        );
      } catch (error) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === pendingAssistantMessage.id ? { ...message, status: 'error', content: '' } : message,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages],
  );

  const handleSubmit = useCallback(
    async (value: string) => {
      if (isLoading) return;
      await callAiApi(value);
    },
    [callAiApi, isLoading],
  );

  const handleSuggestionSelect = useCallback(
    (value: string) => {
      void handleSubmit(value);
    },
    [handleSubmit],
  );

  return (
    <Wrapper.MAIN text="AI 국내 주식 검색">
      <section className="rounded-xl border border-theme-main-color/20 bg-theme-bg-section p-4 shadow-sm">
        <Text.PARAGRAPH text="Gemini 무료 플랜을 활용해 국내 주식 관련 질문에 답변합니다. 실시간 시세나 확정 데이터가 아니므로 투자 결정 전에 반드시 공식 데이터를 확인해 주세요." />
      </section>

      <div className="rounded-xl border border-theme-main-color/10 bg-theme-bg-section p-4">
        <Text.HEADING text="추천 질문" className="mb-2" />
        <SuggestionChips items={SUGGESTIONS} onSelect={handleSuggestionSelect} disabled={isLoading} />
      </div>

      <div className="flex h-[65vh] flex-col overflow-hidden rounded-xl border border-theme-main-color/10 bg-theme-bg-section shadow-md">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}
          <div ref={endRef} />
        </div>

        <ChatInput onSubmit={handleSubmit} disabled={isLoading} />
      </div>

      <Text.CAPTION
        text="※ 본 서비스는 참고용 정보만 제공합니다. 최종 투자 판단과 책임은 사용자에게 있습니다."
        className="text-center"
      />
    </Wrapper.MAIN>
  );
};

export default AiSearchPage;
