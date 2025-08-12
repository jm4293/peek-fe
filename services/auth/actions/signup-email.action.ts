'use server';

import KY from '@/lib/ky';

import { API_URL } from '@/shared/constant/api-url';

import { ISignUpDto } from '../dto';

export const signupEmailAction = async (dto: ISignUpDto) => {
  try {
    await KY.post(`${API_URL}/auth/signup`, {
      json: dto,
    });

    return { success: true };
  } catch (error: unknown) {
    // axios 에러인지 확인
    // const isAxiosError = (err: unknown): err is { response?: { status: number } } => {
    //   return typeof err === 'object' && err !== null && 'response' in err;
    // };

    // 에러 타입에 따른 구체적인 메시지 처리
    // if (isAxiosError(error)) {
    //   switch (error.response?.status) {
    //     case 409:
    //       return { success: false, message: '이미 사용 중인 이메일입니다.' };
    //     case 400:
    //       return { success: false, message: '입력 정보를 확인해주세요.' };
    //     case 500:
    //       return { success: false, message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
    //   }
    // }

    return {
      success: false,
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};
