import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Text } from './Text';

describe('Text Component', () => {
  describe('Text.TITLE', () => {
    it('기본 title을 렌더링한다', () => {
      render(<Text.TITLE text="Title Text" />);
      const titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('Title Text');
    });

    it('기본 스타일 클래스를 적용한다', () => {
      render(<Text.TITLE text="Title Text" />);
      const titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toHaveClass('text-xl', 'font-semibold', 'text-theme-txt-default');
    });

    it('color prop에 따라 색상 클래스를 적용한다', () => {
      const { rerender } = render(<Text.TITLE text="Title Text" color="gray" />);
      let titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toHaveClass('text-theme-txt-gray');

      rerender(<Text.TITLE text="Title Text" color="blue" />);
      titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toHaveClass('text-theme-txt-blue');

      rerender(<Text.TITLE text="Title Text" color="red" />);
      titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toHaveClass('text-theme-txt-red');

      rerender(<Text.TITLE text="Title Text" color="main" />);
      titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toHaveClass('text-theme-main-color');
    });

    it('커스텀 className을 추가한다', () => {
      render(<Text.TITLE text="Title Text" className="custom-class" />);
      const titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toHaveClass('custom-class');
    });

    it('추가 HTML 속성을 전달한다', () => {
      render(<Text.TITLE text="Title Text" data-testid="custom-title" id="title-id" />);
      const titleElement = screen.getByTestId('custom-title');
      expect(titleElement).toHaveAttribute('id', 'title-id');
    });
  });

  describe('Text.SUBTITLE', () => {
    it('기본 subtitle을 렌더링한다', () => {
      render(<Text.SUBTITLE text="Subtitle Text" />);
      const subtitleElement = screen.getByRole('heading', { level: 2 });
      expect(subtitleElement).toBeInTheDocument();
      expect(subtitleElement).toHaveTextContent('Subtitle Text');
    });

    it('기본 스타일 클래스를 적용한다', () => {
      render(<Text.SUBTITLE text="Subtitle Text" />);
      const subtitleElement = screen.getByRole('heading', { level: 2 });
      expect(subtitleElement).toHaveClass('text-lg', 'font-medium', 'text-theme-txt-default');
    });

    it('color prop에 따라 색상 클래스를 적용한다', () => {
      const { rerender } = render(<Text.SUBTITLE text="Subtitle Text" color="gray" />);
      let subtitleElement = screen.getByRole('heading', { level: 2 });
      expect(subtitleElement).toHaveClass('text-theme-txt-gray');

      rerender(<Text.SUBTITLE text="Subtitle Text" color="blue" />);
      subtitleElement = screen.getByRole('heading', { level: 2 });
      expect(subtitleElement).toHaveClass('text-theme-txt-blue');
    });

    it('커스텀 className을 추가한다', () => {
      render(<Text.SUBTITLE text="Subtitle Text" className="subtitle-custom" />);
      const subtitleElement = screen.getByRole('heading', { level: 2 });
      expect(subtitleElement).toHaveClass('subtitle-custom');
    });
  });

  describe('Text.HEADING', () => {
    it('기본 heading을 렌더링한다', () => {
      render(<Text.HEADING text="Heading Text" />);
      const headingElement = screen.getByRole('heading', { level: 3 });
      expect(headingElement).toBeInTheDocument();
      expect(headingElement).toHaveTextContent('Heading Text');
    });

    it('기본 스타일 클래스를 적용한다', () => {
      render(<Text.HEADING text="Heading Text" />);
      const headingElement = screen.getByRole('heading', { level: 3 });
      expect(headingElement).toHaveClass('text-base', 'font-medium', 'text-theme-txt-default');
    });

    it('color prop에 따라 색상 클래스를 적용한다', () => {
      const { rerender } = render(<Text.HEADING text="Heading Text" color="red" />);
      let headingElement = screen.getByRole('heading', { level: 3 });
      expect(headingElement).toHaveClass('text-theme-txt-red');

      rerender(<Text.HEADING text="Heading Text" color="main" />);
      headingElement = screen.getByRole('heading', { level: 3 });
      expect(headingElement).toHaveClass('text-theme-main-color');
    });

    it('커스텀 className을 추가한다', () => {
      render(<Text.HEADING text="Heading Text" className="heading-custom" />);
      const headingElement = screen.getByRole('heading', { level: 3 });
      expect(headingElement).toHaveClass('heading-custom');
    });
  });

  describe('Text.PARAGRAPH', () => {
    it('기본 paragraph를 렌더링한다', () => {
      render(<Text.PARAGRAPH text="Paragraph Text" />);
      const paragraphElement = screen.getByText('Paragraph Text');
      expect(paragraphElement).toBeInTheDocument();
      expect(paragraphElement.tagName).toBe('P');
    });

    it('기본 스타일 클래스를 적용한다', () => {
      render(<Text.PARAGRAPH text="Paragraph Text" />);
      const paragraphElement = screen.getByText('Paragraph Text');
      expect(paragraphElement).toHaveClass('text-sm', 'text-theme-txt-default');
    });

    it('color prop에 따라 색상 클래스를 적용한다', () => {
      const { rerender } = render(<Text.PARAGRAPH text="Paragraph Text" color="gray" />);
      let paragraphElement = screen.getByText('Paragraph Text');
      expect(paragraphElement).toHaveClass('text-theme-txt-gray');

      rerender(<Text.PARAGRAPH text="Paragraph Text" color="blue" />);
      paragraphElement = screen.getByText('Paragraph Text');
      expect(paragraphElement).toHaveClass('text-theme-txt-blue');
    });

    it('커스텀 className을 추가한다', () => {
      render(<Text.PARAGRAPH text="Paragraph Text" className="paragraph-custom" />);
      const paragraphElement = screen.getByText('Paragraph Text');
      expect(paragraphElement).toHaveClass('paragraph-custom');
    });

    it('추가 HTML 속성을 전달한다', () => {
      render(<Text.PARAGRAPH text="Paragraph Text" data-testid="custom-paragraph" />);
      const paragraphElement = screen.getByTestId('custom-paragraph');
      expect(paragraphElement).toBeInTheDocument();
    });
  });

  describe('Text.CAPTION', () => {
    it('기본 caption을 렌더링한다', () => {
      render(<Text.CAPTION text="Caption Text" />);
      const captionElement = screen.getByText('Caption Text');
      expect(captionElement).toBeInTheDocument();
      expect(captionElement.tagName).toBe('P');
    });

    it('기본 스타일 클래스를 적용한다 (italic 포함)', () => {
      render(<Text.CAPTION text="Caption Text" />);
      const captionElement = screen.getByText('Caption Text');
      expect(captionElement).toHaveClass('text-xs', 'italic', 'text-theme-txt-default');
    });

    it('color prop에 따라 색상 클래스를 적용한다', () => {
      const { rerender } = render(<Text.CAPTION text="Caption Text" color="gray" />);
      let captionElement = screen.getByText('Caption Text');
      expect(captionElement).toHaveClass('text-theme-txt-gray');

      rerender(<Text.CAPTION text="Caption Text" color="red" />);
      captionElement = screen.getByText('Caption Text');
      expect(captionElement).toHaveClass('text-theme-txt-red');
    });

    it('커스텀 className을 추가한다', () => {
      render(<Text.CAPTION text="Caption Text" className="caption-custom" />);
      const captionElement = screen.getByText('Caption Text');
      expect(captionElement).toHaveClass('caption-custom');
    });
  });

  describe('Text 컴포넌트 통합 테스트', () => {
    it('모든 Text 컴포넌트가 동시에 렌더링된다', () => {
      render(
        <>
          <Text.TITLE text="Title" />
          <Text.SUBTITLE text="Subtitle" />
          <Text.HEADING text="Heading" />
          <Text.PARAGRAPH text="Paragraph" />
          <Text.CAPTION text="Caption" />
        </>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subtitle');
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Heading');
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Caption')).toBeInTheDocument();
    });

    it('빈 문자열도 렌더링된다', () => {
      render(<Text.TITLE text="" />);
      const titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('');
    });

    it('특수 문자를 포함한 텍스트를 렌더링한다', () => {
      const specialText = 'Special <>&"\'';
      render(<Text.PARAGRAPH text={specialText} />);
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('onClick 이벤트를 처리한다', () => {
      const handleClick = vi.fn();
      render(<Text.TITLE text="Clickable Title" onClick={handleClick} />);
      const titleElement = screen.getByRole('heading', { level: 1 });
      titleElement.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
