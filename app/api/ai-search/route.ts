import { NextResponse } from 'next/server';

import { type ChatMessage, requestGeminiStockAnswer } from '@/services/ai';

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages?: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ message: '메시지 히스토리가 비어 있습니다.' }, { status: 400 });
    }

    const answer = await requestGeminiStockAnswer(messages);

    return NextResponse.json({ content: answer });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'AI 응답 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
