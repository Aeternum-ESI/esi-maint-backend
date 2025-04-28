import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Extract meta data if available
    const meta = error.meta
      ? JSON.stringify(error.meta)
      : 'No additional details';
    switch (error.code) {
      case 'P2000':
        // Value too long for the column
        throw new BadRequestException(
          `One of the provided values is too long. Details: ${meta}`,
        );
      case 'P2001':
        // Record not found
        throw new NotFoundException(
          `The requested record could not be found. Details: ${meta}`,
        );
      case 'P2002':
        // Unique constraint failed
        throw new BadRequestException(
          `A record with this value already exists (field: ${
            error.meta?.target || 'unknown'
          }).`,
        );
      case 'P2003':
        // Foreign key constraint failed
        throw new BadRequestException(
          `A related record is missing or invalid (field: ${
            error.meta?.field_name || 'unknown'
          }).`,
        );
      case 'P2004':
        // A constraint failed on the database
        throw new BadRequestException(
          `A database constraint was violated. Details: ${meta}`,
        );
      case 'P2005':
        // A value is missing which is required
        throw new BadRequestException(
          `A required value is missing. Details: ${meta}`,
        );
      case 'P2006':
        // The provided value for a field is invalid
        throw new BadRequestException(
          `The provided value is invalid. Details: ${meta}`,
        );
      case 'P2007':
        // Data validation error
        throw new BadRequestException(
          `Data validation error. Details: ${meta}`,
        );
      case 'P2008':
        // Failed to parse the query
        throw new BadRequestException(
          `The query could not be parsed. Details: ${meta}`,
        );
      case 'P2009':
        // Failed to validate the query
        throw new BadRequestException(
          `The query failed to validate. Details: ${meta}`,
        );
      case 'P2010':
        // Raw query failed
        throw new InternalServerErrorException(
          `An error occurred while executing a raw query. Details: ${meta}`,
        );
      case 'P2011':
        // Null constraint violation
        throw new BadRequestException(
          `A required field was null. Details: ${meta}`,
        );
      case 'P2012':
        // A related record could not be found
        throw new NotFoundException(
          `A related record could not be found. Details: ${meta}`,
        );
      case 'P2013':
        // Missing or invalid arguments
        throw new BadRequestException(
          `Missing or invalid arguments were provided. Details: ${meta}`,
        );
      case 'P2014':
        // Query failed to execute
        throw new InternalServerErrorException(
          `The query failed to execute. Details: ${meta}`,
        );
      case 'P2015':
        // Cannot query a relation that is not fetched
        throw new BadRequestException(
          `A required related resource was not fetched. Details: ${meta}`,
        );
      case 'P2016':
        // Query returned a database error
        throw new InternalServerErrorException(
          `A database error occurred while processing the query. Details: ${meta}`,
        );
      case 'P2017':
        // Query timed out
        throw new InternalServerErrorException(
          `The query timed out. Please try again later. Details: ${meta}`,
        );
      case 'P2018':
        // Aggregate query error
        throw new BadRequestException(
          `There was an error with the aggregate query. Details: ${meta}`,
        );
      case 'P2019':
        // Aggregate query error due to improper field type
        throw new BadRequestException(
          `Aggregate query failed due to an improper field type. Details: ${meta}`,
        );
      case 'P2020':
        // Failed to validate query
        throw new BadRequestException(
          `The query failed to validate. Details: ${meta}`,
        );
      case 'P2021':
        // Database panic error
        throw new InternalServerErrorException(
          `A critical database error occurred. Details: ${meta}`,
        );
      case 'P2022':
        // Operation would result in a cyclic dependency
        throw new BadRequestException(
          `The requested operation would cause a cyclic dependency. Details: ${meta}`,
        );
      case 'P2023':
        // Invalid database configuration
        throw new InternalServerErrorException(
          `The database configuration is invalid. Details: ${meta}`,
        );
      case 'P2024':
        // Transaction failed
        throw new InternalServerErrorException(
          `The transaction failed. Please try again later. Details: ${meta}`,
        );
      default:
        throw new InternalServerErrorException(
          `An unexpected error occurred. Details: ${meta}`,
        );
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    throw new BadRequestException(
      `There was a validation error with the data provided. Details: ${error.message}`,
    );
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new InternalServerErrorException(
      `Failed to initialize the database connection. Details: ${error.message}`,
    );
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    throw new InternalServerErrorException(
      `A critical error occurred with the database client. Details: ${error.message}`,
    );
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new InternalServerErrorException(
      `An unknown database error occurred. Details: ${error.message}`,
    );
  }

  // If error is not recognized, rethrow it
  throw error;
}
