import createAxiosInstance from '@/lib/axios/axios.config';

import { GetCurrencyListRes } from '../type';

const axios = createAxiosInstance();
const baseURL = '/currency';

const currencyApi = {
  getCurrencyList: async () => {
    return await axios.get<GetCurrencyListRes, null>({ url: `${baseURL}/list` });
  },
};

export default currencyApi;
