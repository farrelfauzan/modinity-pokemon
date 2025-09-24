import { type AbstractEntity } from '../common/abstract.entity';
import { type PageMetaDto } from '../common/dtos/page-meta.dto';

export interface IResponse {
  statusCode: number;
  data: AbstractEntity | AbstractEntity[];
  meta?: PageMetaDto;
}
