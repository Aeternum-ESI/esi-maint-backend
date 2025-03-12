import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { z } from 'zod';

export function IsValidDateString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidDateString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Allow empty values to be handled by other decorators (or consider them valid)
          if (value === null || value === undefined || value === '') {
            return true;
          }

          // Validate the Date object using zod. If the string was invalid, dateObj will be "Invalid Date"
          const result = z.string().date().safeParse(value);
          return result.success;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date string in YYYY-MM-DD format`;
        },
      },
    });
  };
}
