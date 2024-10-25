import { Account } from '@prisma/client';
import { PatchAccountDto } from './dto';
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {
  constructor(private dbService: DbService) {}
  async create(userId: string) {
    return this.dbService.account.create({
      data: {
        ownerId: userId,
        isBlockingEnabled: false,
      },
    });
  }
  async getAccount(userId: string) {
    return this.dbService.account.findUniqueOrThrow({
      where: { ownerId: userId },
    });
  }
  async pathAccount(
    userId: string,
    patchAccountDto: Partial<Pick<Account, 'isBlockingEnabled'>>,
  ) {
    return this.dbService.account.update({
      where: {
        ownerId: userId,
      },
      data: {
        ...patchAccountDto,
      },
    });
  }
}
