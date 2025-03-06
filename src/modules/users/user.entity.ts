import { Role } from '@prisma/client';

export class User {
  id: string;
  email: string;
  role: Role;
  // ... other properties
}
