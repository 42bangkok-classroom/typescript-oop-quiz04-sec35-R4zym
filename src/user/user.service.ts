// import path from 'path/win32';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
// import fs from 'fs';
@Injectable()
export class UserService {
  private readonly UserPath = join(process.cwd(),"users.json")
  
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

  findAll(): string[] {
    return this.readJsonFile(this.UserPath);
  }
}
