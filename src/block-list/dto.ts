import { ApiProperty } from '@nestjs/swagger';
import { BlockItemType } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';
import { string } from 'zod';
export class BlockItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  blockListId: string;

  @ApiProperty({
    type: [BlockItemType.KeyWord, BlockItemType.Website],
  })
  type: BlockItemType;

  @ApiProperty()
  data: string;

  @ApiProperty()
  createdAt: Date;
}

export class BlockListDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty({
    type: [BlockItemDto],
  })
  items: BlockItemDto[];
}

export class BlockListQueryDto {
  @ApiProperty({ nullable: true })
  @IsOptional()
  q?: string;
}

export class AddBlockItemDto {
  @ApiProperty({
    type: [BlockItemType.KeyWord, BlockItemType.Website],
  })
  @IsIn([BlockItemType.KeyWord, BlockItemType.Website])
  type: BlockItemType;

  @ApiProperty()
  data: string;
}
