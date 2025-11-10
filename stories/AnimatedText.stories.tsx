import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useState } from 'react';

import { AnimatedText } from '../components/text/AnimatedText';

const meta = {
  title: 'Components/AnimatedText',
  component: AnimatedText.TITLE,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimatedText.TITLE>;

export default meta;

// 자동 증가 테스트를 위한 래퍼 컴포넌트
const AutoIncrementWrapper = ({ Component, initialValue = 0, interval = 1000 }: any) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev: number) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return <Component text={`카운트: ${count}`} />;
};

// 수동 제어 테스트를 위한 래퍼 컴포넌트
const ManualControlWrapper = ({ Component }: any) => {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <Component text={`현재 값: ${count}`} />
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - 10)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          -10
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500">
          -1
        </button>
        <button onClick={() => setCount(0)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          리셋
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500">
          +1
        </button>
        <button
          onClick={() => setCount(count + 10)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          +10
        </button>
      </div>
    </div>
  );
};

// TITLE Stories
export const TitleDefault: StoryObj = {
  render: () => <AnimatedText.TITLE text="제목 텍스트 100" />,
};

export const TitleAutoIncrement: StoryObj = {
  render: () => <AutoIncrementWrapper Component={AnimatedText.TITLE} />,
};

export const TitleManualControl: StoryObj = {
  render: () => <ManualControlWrapper Component={AnimatedText.TITLE} />,
};

export const TitleAllColors: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <AnimatedText.TITLE text="Default Color: 12345" color="default" />
      <AnimatedText.TITLE text="Gray Color: 12345" color="gray" />
      <AnimatedText.TITLE text="Blue Color: 12345" color="blue" />
      <AnimatedText.TITLE text="Red Color: 12345" color="red" />
      <AnimatedText.TITLE text="Main Color: 12345" color="main" />
    </div>
  ),
};

// SUBTITLE Stories
export const SubtitleAutoIncrement: StoryObj = {
  render: () => <AutoIncrementWrapper Component={AnimatedText.SUBTITLE} />,
};

export const SubtitleManualControl: StoryObj = {
  render: () => <ManualControlWrapper Component={AnimatedText.SUBTITLE} />,
};

// HEADING Stories
export const HeadingAutoIncrement: StoryObj = {
  render: () => <AutoIncrementWrapper Component={AnimatedText.HEADING} />,
};

export const HeadingManualControl: StoryObj = {
  render: () => <ManualControlWrapper Component={AnimatedText.HEADING} />,
};

// PARAGRAPH Stories
export const ParagraphAutoIncrement: StoryObj = {
  render: () => <AutoIncrementWrapper Component={AnimatedText.PARAGRAPH} />,
};

export const ParagraphManualControl: StoryObj = {
  render: () => <ManualControlWrapper Component={AnimatedText.PARAGRAPH} />,
};

// CAPTION Stories
export const CaptionAutoIncrement: StoryObj = {
  render: () => <AutoIncrementWrapper Component={AnimatedText.CAPTION} />,
};

export const CaptionManualControl: StoryObj = {
  render: () => <ManualControlWrapper Component={AnimatedText.CAPTION} />,
};

// 모든 타입 비교
export const AllTypes: StoryObj = {
  render: () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCount((prev: number) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <AnimatedText.TITLE text={`TITLE: ${count}`} color="main" />
          <AnimatedText.SUBTITLE text={`SUBTITLE: ${count}`} color="blue" />
          <AnimatedText.HEADING text={`HEADING: ${count}`} />
          <AnimatedText.PARAGRAPH text={`PARAGRAPH: ${count}`} color="gray" />
          <AnimatedText.CAPTION text={`CAPTION: ${count}`} />
        </div>
      </div>
    );
  },
};

// 빠른 변화 테스트
export const FastChanging: StoryObj = {
  render: () => <AutoIncrementWrapper Component={AnimatedText.TITLE} interval={500} />,
};

// 느린 변화 테스트
export const SlowChanging: StoryObj = {
  render: () => <AutoIncrementWrapper Component={AnimatedText.TITLE} interval={2000} />,
};
