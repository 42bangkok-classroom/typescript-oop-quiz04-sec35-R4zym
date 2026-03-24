// import path from 'path/win32';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
//import * as path from 'path';
import { join } from 'path';
// import fs from 'fs';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly UserPath = join(process.cwd(), 'data', 'users.json');

  private readJsonFile<T>(filePath: string): T[] {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T[];
  }

  test(): string[] {
    return [];
  }

  findAll(): IUser[] {
    return this.readJsonFile<IUser>(this.UserPath);
  }

  findOne(id: string, fields?: string[]): Partial<IUser> {
    const users = this.findAll();
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (fields === undefined) {
      return user;
    }

    const filteredUser: Partial<IUser> = {};
    fields.forEach((f) => {
      const field = f as keyof IUser;
      if (user[field] !== undefined) {
        filteredUser[field] = user[field];
      }
    });

    return filteredUser;
  }

  create(dto: CreateUserDto): IUser {
    const users = this.findAll();

    const lastId =
      users.length > 0 ? Math.max(...users.map((u) => parseInt(u.id))) : 0;

    const newUser: IUser = {
      id: (lastId + 1).toString(),
      ...dto,
    };

    users.push(newUser);
    fs.writeFileSync(this.UserPath, JSON.stringify(users, null, 2), 'utf8');

    return newUser;
  }
}
