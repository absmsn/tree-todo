import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(id: any) {
    const payload = { sub: id };
    return this.jwtService.sign(payload);
  }
}
