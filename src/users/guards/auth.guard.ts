import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequestInterface } from '../../types/express-request.interface';
import { NOT_AUTHORIZED_ERROR } from '../users.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

    if (request.user) {
      return true;
    }

    throw new HttpException(NOT_AUTHORIZED_ERROR, HttpStatus.UNAUTHORIZED);
  }
}
