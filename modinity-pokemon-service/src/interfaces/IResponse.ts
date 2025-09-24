import { type AbstractEntity } from '../common/abstract.entity';

export interface IResponse {
  statusCode: number;
  data: AbstractEntity | AbstractEntity[];
}
