import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}
  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: {
        email,
      },
    });
  }
  create(data: Omit<User, 'id'>) {
    return this.db.user.create({
      data,
    });
  }
}
