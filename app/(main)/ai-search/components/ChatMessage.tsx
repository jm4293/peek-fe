import type { UIMessage } from 'ai';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: UIMessage;
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
  system: {
    alignment: 'justify-start text-left',
    bubble: 'bg-theme-bg-main text-theme-txt-default border border-theme-main-color/30 rounded-2xl rounded-bl-md',
    container: 'items-start gap-3',
  },
} as const;

const ChatMessageBubble = ({ message }: ChatMessageProps) => {
  const { role, parts } = message;
  const style = bubbleStyles[role] || bubbleStyles.assistant;

  const renderContent = () => {
    return parts.map((part, index) => {
      if (part.type === 'text') {
        return (
          <div key={`${message.id}-${index}`} className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{part.text}</ReactMarkdown>
          </div>
        );
      }
      // tool call이나 다른 타입의 part는 필요시 추가
      return null;
    });
  };

  const getTextContent = () => {
    return parts
      .filter((part) => part.type === 'text')
      .map((part) => (part.type === 'text' ? part.text : ''))
      .join('');
  };

  const hasContent = getTextContent().trim().length > 0;
  const createdAt = 'createdAt' in message && message.createdAt instanceof Date ? message.createdAt : null;

  // system 메시지는 표시하지 않음
  if (role === 'system') {
    return null;
  }

  return (
    <div className={`flex ${style.alignment} ${style.container}`}>
      {role === 'assistant' && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-theme-main-color/20 text-xs font-semibold text-theme-main-color">
          AI
        </div>
      )}

      <div className="flex max-w-[75%] flex-col gap-1">
        <div className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${style.bubble}`}>
          {hasContent ? renderContent() : <span className="text-theme-txt-gray">답변을 생성하고 있어요...</span>}
        </div>

        {createdAt && (
          <span className="text-xs text-theme-txt-gray">{dayjs(createdAt).format('YYYY.MM.DD HH:mm')}</span>
        )}
      </div>
    </div>
  );
};

export default ChatMessageBubble;
