import type { User } from '@testonwheels/database';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
