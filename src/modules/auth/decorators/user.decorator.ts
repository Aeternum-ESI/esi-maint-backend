import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to extract the user from the request object.
 *
 * Usage examples:
 *
 * // Extract the entire user object
 * @User() user: any
 *
 * // Extract a specific property from the user object
 * @User('email') email: string
 */
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    // If data is provided, return just that property from the user object
    return data ? user[data] : user;
  },
);
