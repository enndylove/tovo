import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as sc from '@testonwheels/database';
import { eq } from 'drizzle-orm';
import type { User, NewUser } from '@testonwheels/database';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { DB } from 'src/drizzle/drizzle.module';

export const JWT_TOKEN_VARIABLE = 'access_token';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;

  constructor(
    @Inject('DB') private db: DB,
    private readonly jwtService: JwtService,
  ) {}

  async decodeToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async findUserByEmail(email: User['email']) {
    const user = await this.db
      .select()
      .from(sc.users)
      .where(eq(sc.users.email, email))
      .limit(1);

    return user[0];
  }

  async validateUser(entity: User) {
    const user = await this.db.query.users.findFirst({
      columns: {
        id: true,
        name: true,
        email: true,
        password: true,
        imageUrl: true,
      },
      where: eq(sc.users.email, entity.email),
    });

    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(entity.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    return user;
  }

  async signUp(entity: NewUser): Promise<User[]> {
    const hashPass = await bcrypt.hash(entity.password, this.saltOrRounds);

    return this.db
      .insert(sc.users)
      .values({
        name: entity.name,
        email: entity.email,
        password: hashPass,
      })
      .returning();
  }

  async authentication(entity: NewUser, res: Response) {
    const payload = {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      imageUrl: entity.imageUrl,
    };

    const access_token = await this.jwtService.signAsync(payload);

    res.cookie(JWT_TOKEN_VARIABLE, access_token, {
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.send({ access_token });
  }

  async signIn(dto: User, res: Response) {
    const user = await this.validateUser(dto);
    return this.authentication(user, res);
  }

  logout(res: Response) {
    res.clearCookie(JWT_TOKEN_VARIABLE, {
      sameSite: 'strict',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return { message: 'Logged out successfully' };
  }
}
