'use client';

import { Text } from '@/components/text';

interface SuggestionChipsProps {
  onSelect: (value: string) => void;
}

const SUGGESTIONS = [
  '삼성전자 최근 실적과 향후 전망 알려줘',
  'LG에너지솔루션에 투자할 때 주의할 점은 뭐야?',
  '2차전지 관련 국내 대장주 후보 정리해줘',
];

export const SuggestionChips = ({ onSelect }: SuggestionChipsProps) => {
  return SUGGESTIONS.map((el, index) => (
    <div key={el} className="cursor-pointer" onClick={() => onSelect(el)}>
      <Text.PARAGRAPH text={`${index + 1}. ${el}`} />
    </div>
  ));
};
