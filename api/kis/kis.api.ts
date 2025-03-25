import { IKisOauthTokenRes } from '@/types/res';
import { AxiosConfig } from '@/common/axios';

class KisApi extends AxiosConfig {
  private readonly _baseURL = '/kis';

  async getOauthToken() {
    return await this.get<IKisOauthTokenRes, null>({ url: `${this._baseURL}/oauth-token` });
  }

  async deleteOauthRevoke() {
    return await this.delete({ url: `${this._baseURL}/oauth-revoke` });
  }
}

export default new KisApi();
