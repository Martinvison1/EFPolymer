import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('database.url'),
        },
      },
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    
    // Enable SQLite optimizations
    await this.$executeRawUnsafe('PRAGMA journal_mode = WAL;');
    await this.$executeRawUnsafe('PRAGMA synchronous = NORMAL;');
    await this.$executeRawUnsafe('PRAGMA cache_size = 1000000;');
    await this.$executeRawUnsafe('PRAGMA foreign_keys = ON;');
    await this.$executeRawUnsafe('PRAGMA temp_store = MEMORY;');
  }
}