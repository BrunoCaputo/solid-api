import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users.repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
