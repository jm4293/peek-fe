import AXIOS from '@/lib/axios';

import { IKisOauthTokenRes } from '@/services/kis';

class KisApi extends AXIOS {
  private readonly _baseURL = '/kis';

  async getOauthToken() {
    return await this.get<IKisOauthTokenRes, null>({ url: `${this._baseURL}/oauth-token` });
  }

  async deleteOauthRevoke() {
    return await this.delete({ url: `${this._baseURL}/oauth-revoke` });
  }
}

const kisApi = new KisApi();

export default kisApi;
