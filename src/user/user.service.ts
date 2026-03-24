// import path from 'path/win32';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
//import * as path from 'path';
import { join } from 'path';
// import fs from 'fs';
import { IUser } from './user.interface';

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

    if (!fields || fields.length === 0) {
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
}
