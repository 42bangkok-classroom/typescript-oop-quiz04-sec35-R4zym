import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'firstname should not be empty' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'lastname should not be empty' })
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
