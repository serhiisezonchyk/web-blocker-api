import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { GetSessionInfoDto } from 'src/auth/dto';
import { SessionInfo } from 'src/common/decorators/session-info.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { BlockListService } from './block-list.service';
import { AddBlockItemDto, BlockItemDto, BlockListDto, BlockListQueryDto } from './dto';

@SkipThrottle()
@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {
  constructor(private readonly blockListService: BlockListService) {}
  @Get()
  @ApiOkResponse({
    type: BlockListDto,
  })
  getList(@Query() query: BlockListQueryDto, @SessionInfo() session: GetSessionInfoDto): Promise<BlockListDto> {
    return this.blockListService.getByUserId(session.id, query);
  }

  @Post('item')
  @ApiCreatedResponse({
    type: BlockItemDto,
  })
  addBlockItem(@Body() body: AddBlockItemDto, @SessionInfo() session: GetSessionInfoDto): Promise<BlockItemDto> {
    return this.blockListService.addItem(session.id, body);
  }

  @Delete('item/:id')
  @ApiOkResponse({
    type: BlockItemDto,
  })
  // removeBlockItem(@Param(ParseIntPipe) id: number) {}
  async removeBlockItem(@Param('id', new ParseIntPipe()) id: number, @SessionInfo() session: GetSessionInfoDto): Promise<BlockItemDto> {
    return this.blockListService.removeItem(session.id, id);
  }
}
