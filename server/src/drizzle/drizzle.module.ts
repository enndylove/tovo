import { Module, Global } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@tovo/database';

export type DB = NodePgDatabase<typeof schema>;

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      useFactory: () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: ['DB'],
})
export class DrizzleModule {}
