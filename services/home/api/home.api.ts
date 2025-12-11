import createAxiosInstance from '@/lib/axios/axios.config';

import { GetRecentBoardListRes } from '../type';

const axios = createAxiosInstance();
const baseURL = '/home';

const homeApi = {
  getRecentBoardList: async () => {
    return await axios.get<GetRecentBoardListRes, null>({ url: `${baseURL}/recent-boards` });
  },
};

export default homeApi;
