import AXIOS from '@/lib/axios';

import { IHomeRecentBoardListRes } from '@/services/home';

class HomeApi extends AXIOS {
  private readonly _baseURL = '/home';

  async getRecentBoardList() {
    return await this.get<IHomeRecentBoardListRes, null>({ url: `${this._baseURL}/recent-boards` });
  }
}

const homeApi = new HomeApi();

export default homeApi;
