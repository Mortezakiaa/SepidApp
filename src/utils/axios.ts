import axios, { AxiosError, AxiosHeaders, AxiosInstance, RawAxiosRequestHeaders } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: { 'Content-Type': 'application/json' },
});
type AxiosHeadersType = RawAxiosRequestHeaders | AxiosHeaders;
class Axios {
  axios: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  async get<T = any>(url: string, params?: QueryParams<T> | object, headers?: AxiosHeadersType) {
    try {
      const res = await this.axios.get<ResponseModel<T>>(url, { headers: headers, params });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) throw e.response;
      throw e;
    }
  }

  async post<T = any>(url: string, data: Partial<T> | any, headers?: AxiosHeadersType) {
    try {
      const res = await this.axios.post<ResponseModel<T>>(url, data, { headers });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) throw e.response?.data;
      throw e;
    }
  }

  async patch<T = any>(url: string, data: Partial<T> | any, headers?: AxiosHeadersType) {
    try {
      const res = await this.axios.patch<ResponseModel<T>>(url, data, { headers });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) throw e.response?.data;
      throw e;
    }
  }

  async delete<T = any>(url: string, headers?: AxiosHeadersType) {
    try {
      const res = await this.axios.delete<ResponseModel<T>>(url, { headers });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) throw e.response?.data;
      throw e;
    }
  }
}

const ApiService = new Axios(axiosInstance);
export default ApiService;
