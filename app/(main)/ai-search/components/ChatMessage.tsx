import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';

import type { ChatMessage } from '@/services/ai/types';

export interface ChatMessageWithMeta extends ChatMessage {
  id: string;
  createdAt: string;
  status?: 'pending' | 'done' | 'error';
}

interface ChatMessageProps {
  message: ChatMessageWithMeta;
}

const bubbleStyles = {
  user: {
    alignment: 'justify-end text-right',
    bubble: 'bg-theme-main-color text-white rounded-2xl rounded-br-md',
    container: 'items-end gap-3',
  },
  assistant: {
    alignment: 'justify-start text-left',
    bubble: 'bg-theme-bg-main text-theme-txt-default border border-theme-main-color/30 rounded-2xl rounded-bl-md',
    container: 'items-start gap-3',
  },
} as const;

const ChatMessageBubble = ({ message }: ChatMessageProps) => {
  const { role, content, createdAt, status } = message;
  const style = bubbleStyles[role];

  const renderStatusText = () => {
    if (status === 'pending') return '답변을 생성하고 있어요...';
    if (status === 'error') return '오류가 발생했어요. 잠시 후 다시 시도해 주세요.';
    return content;
  };

  return (
    <div className={`flex ${style.alignment} ${style.container}`}>
      {role === 'assistant' && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-theme-main-color/20 text-xs font-semibold text-theme-main-color">
          AI
        </div>
      )}

      <div className="flex max-w-[75%] flex-col gap-1">
        <div className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${style.bubble}`}>
          {status && status !== 'done' ? (
            <span>{renderStatusText()}</span>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        <span className="text-xs text-theme-txt-gray">
          {dayjs(createdAt).format('YYYY.MM.DD HH:mm')}
        </span>
      </div>
    </div>
  );
};

export default ChatMessageBubble;

