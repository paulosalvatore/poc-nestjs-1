import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user).catch((e: Error) => {
      if (e.message === 'Username already taken') {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Get()
  list() {
    return this.usersService.list();
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.getUser(username).catch((e: Error) => {
      if (e.message === 'User not found') {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Put(':username')
  updateUser(
    @Param('username') username: string,
    @Body() params: UpdateUserDto,
  ) {
    return this.usersService.updateUser(username, params).catch((e: Error) => {
      if (e.message === 'User not found') {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('username') username: string) {
    return this.usersService.deleteUser(username).catch((e: Error) => {
      if (e.message === 'User not found') {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
