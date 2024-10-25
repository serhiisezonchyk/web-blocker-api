import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AccountService } from 'src/account/account.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private accountService: AccountService,
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
    return user
  }
}
