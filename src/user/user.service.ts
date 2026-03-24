import path from 'path/win32';
import fs from 'fs';

export class UserService {
  private readonly UserPath = path.resolve(__dirname, '../data/students.json');

  private readJsonFile(filePath: string): string[] {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return [];
    }
  }

  test(): string[] {
    return [];
  }

  findAll(): string[] {
    return this.readJsonFile(this.UserPath);
  }
}
