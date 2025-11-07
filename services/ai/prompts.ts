import type { ChatMessage } from './types';

const SYSTEM_INSTRUCTION = `당신은 국내 주식 시장 정보를 정리해 주는 한국어 금융 도우미입니다.

- 사용자가 제공한 질문과 대화 맥락을 바탕으로 한국 주식 종목에 대한 개요, 최근 이슈, 참고할 만한 지표나 뉴스 등을 정리해 주세요.
- 실제 시세나 재무 데이터는 최신이 아닐 수 있으므로 "실시간 데이터는 제공되지 않습니다"와 같은 주의 문구를 함께 안내하세요.
- 투자 자문이 아닌 참고 정보라는 점을 명확히 밝혀 주세요.
- 마크다운을 활용해 제목, 목록, 표 등을 가독성 좋게 구성해 주세요.
- 제공할 수 있는 확실한 정보 위주로 답변하고, 모호하거나 확실하지 않은 내용은 "추가 확인이 필요하다"고 안내하세요.
`;

export const buildPromptFromMessages = (messages: ChatMessage[]) => {
  const conversation = messages
    .map((message) => {
      const speaker = message.role === 'user' ? '사용자' : 'AI';
      return `${speaker}: ${message.content.trim()}`;
    })
    .join('\n');

  return `${SYSTEM_INSTRUCTION}\n\n[대화]\n${conversation}\n\n위 대화를 바탕으로 사용자에게 도움이 되는 구조화된 답변을 작성해 주세요.`;
};

