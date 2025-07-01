import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  // ╔═════════════════╗
  // ║      Email      ║
  // ╚═════════════════╝
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  // ╔═════════════════╗
  // ║      Password   ║
  // ╚═════════════════╝
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}
