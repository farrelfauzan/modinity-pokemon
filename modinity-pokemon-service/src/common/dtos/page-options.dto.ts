import { IsObject, IsOptional } from 'class-validator';

import { Order } from '../../enum';
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '../../decorators';

export class PageOptionsDto {
  @EnumFieldOptional(() => Order, {
    default: Order.ASC,
  })
  readonly order?: Order = Order.ASC;

  @NumberFieldOptional({
    minimum: 0,
    default: 0,
    int: true,
  })
  readonly page: number = 0;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 100,
    default: 10,
    int: true,
  })
  readonly pageSize: number = 10;

  @NumberFieldOptional()
  readonly skip?: number = this.page * this.pageSize;

  @IsObject()
  @IsOptional()
  readonly filter?: Record<string, string | number>;

  @StringFieldOptional()
  readonly sortBy?: string;

  @StringFieldOptional()
  readonly query?: string;
}
