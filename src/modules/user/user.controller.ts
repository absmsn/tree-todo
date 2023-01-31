import { 
  Get,
  Body,
  Post,
  Param,
  Query,
  Controller,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import Digest from 'src/utils/digest';
import { createUserAttachmentDir } from 'src/utils/file';
import { FindManyOptions } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { MapService } from '../map/map.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { MapsQueryDto } from './dto/maps-query.dot';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mapService: MapService
  ) {}

  @Post("/")
  async addUser(@Body() body: CreateUserDto) {
    const user = await this.userService.findOne({
      where: {email: body.email}
    });
    if (!user) {
      const newUser = await this.userService.add(body);
      await createUserAttachmentDir(newUser.id);
      const token = this.authService.login(newUser.id);
      return {
        id: newUser.id,
        email: newUser.email,
        token
      };
    } else {
      throw new ForbiddenException({
        message: "User already exists"
      });
    }
  }

  @Post("/login")
  async login(@Body() body: LoginDto) {
    const user = await this.userService.findOne({
      where: {email: body.email}
    });
    if (user) {
      if (Digest.hash(body.password) === user.passwordHash) {
        const token = this.authService.login(user.id);
        return {
          id: user.id,
          email: user.email,
          token
        };
      } else {
        throw new UnauthorizedException({
          message: "Invalid password"
        });
      }
    } else {
      throw new NotFoundException({
        message: "Email not found"
      });
    }
  }

  @Get("/:userId/maps")
  async getMapList(@Param("userId") userId: number, @Query() query: MapsQueryDto) {
    const user = await this.userService.findOne({
      where: { id: userId }
    });
    if (user) {
      const option: FindManyOptions = { where: { userId } };
      if (query.subRelations) {
        option.relations = query.subRelations.split(",");
      }
      return this.mapService.find(option);
    } else {
      throw new NotFoundException();
    }
  }

  @Get("/:userId/maps-meta")
  async getMapListMeta(@Param() params: any) {
    const userId = params["userId"];
    const user = await this.userService.findOne(userId);
    if (user) {
      return user.maps.map(map => ({
        id: map.id,
        name: map.name
      }));
    } else {
      throw new NotFoundException();
    }
  }
}
