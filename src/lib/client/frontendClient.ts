import { AxiosRequestConfig } from 'axios';
import AxiosClient from './AxiosClient';

const CONFIG: AxiosRequestConfig = {
  baseURL: '/api',
};

const frontendClient = new AxiosClient(CONFIG);
export default frontendClient;
