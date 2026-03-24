// import path from 'path/win32';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
// import fs from 'fs';
@Injectable()
export class UserService {
  private readonly UserPath = path.resolve(__dirname, '../data/students.json');

  private readJsonFile(filePath: string): string[] {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as string[];
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return [] as string[];
    }
  }

  test(): string[] {
    return [];
  }

  findAll(): string[] {
    return this.readJsonFile(this.UserPath);
  }
}
