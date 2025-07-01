import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  // ╔═══════════════════════╗
  // ║      Constructor      ║
  // ╚═══════════════════════╝
  constructor(private readonly usersService: UsersService) {}

  // ╔════════════════════╗
  // ║      Register      ║
  // ╚════════════════════╝
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // ╔═════════════════╗
  // ║      Login      ║
  // ╚═════════════════╝
  @Post()
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  // ╔════════════════════╗
  // ║      Get User      ║
  // ╚════════════════════╝
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // ╔═══════════════════════╗
  // ║      Update User      ║
  // ╚═══════════════════════╝
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
