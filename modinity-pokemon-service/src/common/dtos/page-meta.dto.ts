import { ApiProperty } from '@nestjs/swagger';

import { type PageOptionsDto } from './page-options.dto';

interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters) {
    this.count = itemCount;
    this.page = pageOptionsDto.page;
    this.pageSize = pageOptionsDto.pageSize;
    // this.pageCount = Math.ceil(this.count / this.pageSize);
    // this.hasPreviousPage = this.page > 1;
    // this.hasNextPage = this.page < this.pageCount;
  }
}
