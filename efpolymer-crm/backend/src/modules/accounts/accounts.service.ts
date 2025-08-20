import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { offset = 0, limit = 25, q, sort } = paginationDto;
    
    const where = q ? {
      OR: [
        { name: { contains: q, mode: 'insensitive' as const } },
        { region: { contains: q, mode: 'insensitive' as const } },
        { segment: { contains: q, mode: 'insensitive' as const } },
      ],
    } : {};

    const orderBy = sort ? this.parseSortParam(sort) : { createdAt: 'desc' as const };

    const [accounts, totalCount] = await Promise.all([
      this.prisma.account.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        include: {
          _count: {
            select: {
              contacts: true,
              opportunities: true,
              tickets: true,
            },
          },
        },
      }),
      this.prisma.account.count({ where }),
    ]);

    return {
      data: accounts,
      meta: {
        totalCount,
        offset,
        limit,
        hasMore: offset + limit < totalCount,
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
      include: {
        contacts: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        opportunities: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        tickets: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            contacts: true,
            opportunities: true,
            tickets: true,
          },
        },
      },
    });
  }

  async create(createAccountDto: any) {
    return this.prisma.account.create({
      data: createAccountDto,
    });
  }

  async update(id: string, updateAccountDto: any) {
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  async remove(id: string) {
    return this.prisma.account.delete({
      where: { id },
    });
  }

  private parseSortParam(sort: string) {
    const [field, order] = sort.split(':');
    return { [field]: order === 'desc' ? 'desc' : 'asc' };
  }
}