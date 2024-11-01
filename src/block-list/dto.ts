import { ApiProperty } from '@nestjs/swagger';
import { $Enums, BlockItemType } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';
export class BlockItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  blockListId: string;

  @ApiProperty({
    enum: [$Enums.BlockItemType.KeyWord, $Enums.BlockItemType.Website],
  })
  type: $Enums.BlockItemType;

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
  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;
}

export class AddBlockItemDto {
  @ApiProperty({
    enum: [$Enums.BlockItemType.KeyWord, $Enums.BlockItemType.Website],
  })
  @IsIn([$Enums.BlockItemType.KeyWord, $Enums.BlockItemType.Website])
  type: BlockItemType;

  @ApiProperty()
  data: string;
}
