'use client';

import { Send } from 'lucide-react';
import { useRef, useState } from 'react';

interface ChatInputProps {
  onSubmit: (value: string) => Promise<void> | void;
  disabled?: boolean;
}

const MAX_LENGTH = 800;

const ChatInput = ({ onSubmit, disabled }: ChatInputProps) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    setValue('');
    await onSubmit(trimmed);
    textareaRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-white/10 bg-theme-bg-section/90 p-3">
      <div className="flex flex-col gap-2">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            maxLength={MAX_LENGTH}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void handleSubmit(event);
              }
            }}
            placeholder="국내 주식에 대해 궁금한 점을 입력해 보세요"
            rows={1}
            className="max-h-32 w-full resize-none rounded-lg border border-white/10 bg-theme-bg-main px-3 py-2 pr-12 text-sm text-theme-txt-default shadow-inner focus:outline-none focus:ring-2 focus:ring-theme-main-color/50"
          />

          <button
            type="submit"
            aria-label="메시지 전송"
            disabled={disabled || !value.trim()}
            className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-theme-main-color text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-theme-main-color/40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right text-xs text-theme-txt-gray">{value.length}/{MAX_LENGTH}</div>
      </div>
    </form>
  );
};

export default ChatInput;

