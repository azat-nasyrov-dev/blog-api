import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from '../../types/express-request.interface';

export const User = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();

    if (!request.user) {
      return null;
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
