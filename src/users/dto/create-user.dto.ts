import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ACCOUNT_STATUS, ACCOUNT_TYPE, PRODUCT_TYPE } from 'src/constants';

export class CreateUserDto {
  // ╔════════════════════════╗
  // ║      Account Type      ║
  // ╚════════════════════════╝
  @IsEnum(ACCOUNT_TYPE)
  accountType: ACCOUNT_TYPE;

  // ╔══════════════════════════╗
  // ║      Account Status      ║
  // ╚══════════════════════════╝
  @IsEnum(ACCOUNT_STATUS)
  @IsOptional()
  accountStatus?: ACCOUNT_STATUS;

  // ╔══════════════════════╗
  // ║      First Name      ║
  // ╚══════════════════════╝
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  firstName: string;

  // ╔═════════════════════╗
  // ║      Last Name      ║
  // ╚═════════════════════╝
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  lastName: string;

  // ╔═════════════════╗
  // ║      Email      ║
  // ╚═════════════════╝
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  // ╔════════════════════════╗
  // ║      Phone Number      ║
  // ╚════════════════════════╝
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  phoneNumber: string;

  // ╔═══════════════════╗
  // ║      Address      ║
  // ╚═══════════════════╝
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  address: string;

  // ╔════════════════════════╗
  // ║      Product Type      ║
  // ╚════════════════════════╝
  @IsEnum(PRODUCT_TYPE)
  productType: PRODUCT_TYPE;

  // ╔═══════════════════════╗
  // ║      OLCC Number      ║
  // ╚═══════════════════════╝
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  olccNumber: string;

  // ╔════════════════════╗
  // ║      Password      ║
  // ╚════════════════════╝
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}
