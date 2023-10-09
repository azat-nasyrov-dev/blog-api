import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '../../types/express-request.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/jwt.config';
import { UsersService } from '../users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  public async use(
    req: ExpressRequestInterface,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET);
      req.user = await this.usersService.findUserById(decode.id);
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
