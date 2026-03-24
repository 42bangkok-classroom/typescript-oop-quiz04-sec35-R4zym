import path from "path/win32";
import fs from "fs";

export class UserService {
  private readonly UserPath = path.resolve(__dirname, '../data/students.json');

  private readJsonFile<User>(UserPath: string): User[] {
    if (!fs.existsSync(UserPath)) {
      fs.writeFileSync(UserPath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(UserPath, 'utf-8');
    return JSON.parse(data) as User[];
  }

  test(): string[] {
    return [];
  }

  findAll(): string[] {
    return this.readJsonFile(this.UserPath);
  }
}
