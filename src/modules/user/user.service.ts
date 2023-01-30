import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import Digest from "../../utils/digest";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(query: any) {
    return await this.usersRepository.findOne(query);
  }

  async add(user: CreateUserDto) {
    const newUser = this.usersRepository.create();
    newUser.email = user.email;
    newUser.passwordHash = Digest.hash(user.password);
    await this.usersRepository.insert(newUser);
    return newUser;
  }
}
