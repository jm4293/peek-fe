import { ErrorCode } from '../constant/error-code/error-code';

export interface IResponseType<T> {
  success: boolean;
  data: T | null;
  error?: string;
  code?: ErrorCode;
}
