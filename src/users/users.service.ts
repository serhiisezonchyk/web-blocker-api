import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AccountService } from 'src/account/account.service';
import { BlockListService } from 'src/block-list/block-list.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private accountService: AccountService,
    private blockListService: BlockListService,
  ) {}
  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: {
        email,
      },
    });
  }
  async create(data: Omit<User, 'id'>) {
    const user = await this.db.user.create({
      data,
    });
    await this.accountService.create(user.id);
    await this.blockListService.create(user.id);
    return user;
  }
}
