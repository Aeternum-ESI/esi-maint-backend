import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ status: string; code: number; message: string; data: T }> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode; // e.g., 200
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        code: statusCode,
        message: 'Request successful',
        data,
      })),
    );
  }
}
