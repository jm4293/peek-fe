import { AxiosConfig } from '@/common/axios';

import { ICheckEmailDto, ILoginEmailDto, ILoginOauthDto, ISignUpDto } from '@/types/dto';
import { ICheckEmailRes, ILoginRes, IRefreshTokenRes, ISignUpRes } from '@/types/res';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/auth';

  async signInEmail(dto: ILoginEmailDto) {
    return await this.post<ILoginRes, ILoginEmailDto>({
      url: `${this._baseURL}/login`,
      data: dto,
    });
  }

  async signInOauth(dto: ILoginOauthDto) {
    return await this.post<ILoginRes, ILoginOauthDto>({
      url: `${this._baseURL}/login-oauth`,
      data: dto,
    });
  }

  async checkEmail(dto: ICheckEmailDto) {
    return await this.post<ICheckEmailRes, ICheckEmailDto>({
      url: `${this._baseURL}/check-email`,
      data: dto,
    });
  }

  async signUp(dto: ISignUpDto) {
    return await this.post<ISignUpRes, ISignUpDto>({
      url: `${this._baseURL}/register`,
      data: dto,
    });
  }

  async logout() {
    return await this.post<{}, {}>({ url: `${this._baseURL}/logout`, data: {} });
  }

  async refreshToken() {
    return await this.post<IRefreshTokenRes, {}>({
      url: `${this._baseURL}/refresh-token`,
      data: {},
    });
  }
}

export default new AuthApi();
