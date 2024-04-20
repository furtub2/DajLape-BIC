// Assuming UserPayload is defined elsewhere in your project, you might need to import it
import { User } from '@prisma/client';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  export interface Request {
    user?: User; // Optionally make it nullable with '?'
  }
}
