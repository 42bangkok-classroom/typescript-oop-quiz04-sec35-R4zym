import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'firstname should not be empty' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'lastname should not be empty' })
  lastname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  username: string;
}
