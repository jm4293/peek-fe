import { ResEnum } from '@/shared/enum/res';

export interface ResConfig<T> {
  result: ResEnum;
  message: string;
  data: T;
}
