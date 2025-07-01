import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL, UserDocument } from 'src/schemas/user/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
  ) {}

  // ╔════════════════════════════╗
  // ║      Register Service      ║
  // ╚════════════════════════════╝
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userModel
        .findOne({ email: createUserDto.email })
        .exec();
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new ServiceUnavailableException('Failed to create user');
    }
  }

  // ╔═════════════════════════╗
  // ║      Login Service      ║
  // ╚═════════════════════════╝
  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userModel
        .findOne({ email: loginUserDto.email })
        .select('+password')
        .exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await user.comparePassword(loginUserDto.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
      return user;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid email format');
      } else {
        throw new ServiceUnavailableException();
      }
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid user ID format');
      } else {
        throw new ServiceUnavailableException();
      }
    }
  }

  async update(id: string, updateUserDto) {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, {
          new: true,
          runValidators: true,
        })
        .exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid user ID format');
      } else if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      } else {
        throw new ServiceUnavailableException();
      }
    }
  }
}
