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
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};
