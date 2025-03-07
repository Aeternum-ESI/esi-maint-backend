import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(
  HttpException,
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientUnknownRequestError,
)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      // Support both string and object messages
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : (res as any).message || exception.message || message;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Map known Prisma errors to proper HTTP status codes and messages
      switch (exception.code) {
        case 'P2000':
          status = HttpStatus.BAD_REQUEST;
          message = `One of the provided values is too long. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2001':
          status = HttpStatus.NOT_FOUND;
          message = `The requested record was not found. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2002':
          status = HttpStatus.BAD_REQUEST;
          message = `Unique constraint failed on field(s): ${
            exception.meta?.target || 'unknown'
          }`;
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = `Foreign key constraint failed. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2004':
          status = HttpStatus.BAD_REQUEST;
          message = `A database constraint failed. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2005':
          status = HttpStatus.BAD_REQUEST;
          message = `A required value is missing. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2006':
          status = HttpStatus.BAD_REQUEST;
          message = `The provided value is invalid. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2007':
          status = HttpStatus.BAD_REQUEST;
          message = `Data validation error. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2008':
          status = HttpStatus.BAD_REQUEST;
          message = `Failed to parse the query. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2009':
          status = HttpStatus.BAD_REQUEST;
          message = `Failed to validate the query. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2010':
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Raw query failed. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2011':
          status = HttpStatus.BAD_REQUEST;
          message = `Null constraint violation. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2012':
          status = HttpStatus.NOT_FOUND;
          message = `A related record could not be found. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2013':
          status = HttpStatus.BAD_REQUEST;
          message = `Missing or invalid arguments. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2014':
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Query failed to execute. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2015':
          status = HttpStatus.BAD_REQUEST;
          message = `Cannot query a relation that was not fetched. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2016':
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Query returned a database error. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2017':
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Query timed out. Please try again. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2018':
          status = HttpStatus.BAD_REQUEST;
          message = `Aggregate query error. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2019':
          status = HttpStatus.BAD_REQUEST;
          message = `Aggregate query error due to improper field type. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2020':
          status = HttpStatus.BAD_REQUEST;
          message = `Failed to validate query. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2021':
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Database panic error. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2022':
          status = HttpStatus.BAD_REQUEST;
          message = `Operation would result in a cyclic dependency. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2023':
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Invalid database configuration. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        case 'P2024':
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Transaction failed. Details: ${JSON.stringify(
            exception.meta,
          )}`;
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `An unknown database error occurred. Details: ${JSON.stringify(
            exception.meta,
          )}`;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    }

    response.status(status).json({
      status: 'error',
      code: status,
      message,
    });
  }
}
