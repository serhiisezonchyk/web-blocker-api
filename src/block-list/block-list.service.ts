import { ConflictException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddBlockItemDto, BlockListQueryDto } from './dto';

@Injectable()
export class BlockListService {
  constructor(private dbService: DbService) {}
  create(userId: string) {
    return this.dbService.blockList.create({
      data: {
        ownerId: userId,
      },
    });
  }

  getByUserId(userId: string, query: BlockListQueryDto) {
    return this.dbService.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: { data: { contains: query.q, mode: 'insensitive' } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async addItem(userId: string, data: AddBlockItemDto) {
    const blockList = await this.dbService.blockList.findUniqueOrThrow({
      where: {
        ownerId: userId,
      },
    });

    const existingItem = await this.dbService.blockItem.findFirst({
      where: {
        blockListId: blockList.id,
        data: data.data,
        type: data.type,
      },
    });

    if (existingItem) {
      throw new ConflictException(`An item with the same ${data.type} already exists in your block list.`);
    }
    return this.dbService.blockItem.create({
      data: {
        blockListId: blockList.id,
        ...data,
      },
    });
  }

  async removeItem(userId: string, itemId: number) {
    const blockList = await this.dbService.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });
    return this.dbService.blockItem.delete({
      where: {
        blockListId: blockList.id,
        id: itemId,
      },
    });
  }
}
