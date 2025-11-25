import { createGateway } from '@ai-sdk/gateway';
import { UIMessage, convertToModelMessages, streamText } from 'ai';

const SYSTEM_INSTRUCTION = `당신은 국내 주식 시장 정보를 정리해 주는 한국어 금융 도우미입니다.

- 사용자가 제공한 질문과 대화 맥락을 바탕으로 한국 주식 종목에 대한 개요, 최근 이슈, 참고할 만한 지표나 뉴스 등을 정리해 주세요.
- 실제 시세나 재무 데이터는 최신이 아닐 수 있으므로 "실시간 데이터는 제공되지 않습니다"와 같은 주의 문구를 함께 안내하세요.
- 투자 자문이 아닌 참고 정보라는 점을 명확히 밝혀 주세요.
- 마크다운을 활용해 제목, 목록, 표 등을 가독성 좋게 구성해 주세요.
- 제공할 수 있는 확실한 정보 위주로 답변하고, 모호하거나 확실하지 않은 내용은 "추가 확인이 필요하다"고 안내하세요.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as {
      messages?: UIMessage[];
      id?: string;
      trigger?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ message: '메시지 히스토리가 비어 있습니다.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Vercel AI Gateway API 키 확인
    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      // eslint-disable-next-line no-console
      console.error('AI_GATEWAY_API_KEY is not set');
      return new Response(JSON.stringify({ message: 'AI Gateway API 키가 설정되어 있지 않습니다.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // eslint-disable-next-line no-console
    console.log('API Key exists:', !!apiKey, 'Length:', apiKey.length, 'First 10 chars:', apiKey.substring(0, 10));

    // Gateway provider 생성
    const gateway = createGateway({
      apiKey,
    });

    // Gemini 모델 이름: google/gemini-1.5-flash 형식으로 사용
    const modelName = process.env.GEMINI_MODEL || 'google/gemini-1.5-flash';

    const modelMessages = convertToModelMessages(messages);

    const result = streamText({
      model: gateway(modelName),
      system: SYSTEM_INSTRUCTION,
      messages: modelMessages,
      temperature: 0.4,
      maxOutputTokens: 1024,
      onFinish: (event) => {
        // eslint-disable-next-line no-console
        console.log('Stream finished:', {
          finishReason: event.finishReason,
          usage: event.usage,
          textLength: event.text?.length || 0,
        });
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error('Stream error:', error);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in /api/chat:', error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'AI 응답 생성 중 오류가 발생했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
