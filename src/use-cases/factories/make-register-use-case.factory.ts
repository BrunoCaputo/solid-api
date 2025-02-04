import { PrismaUsersRepository } from '@/repositories/impl/prisma-users.repository'

import { RegisterUseCase } from '../register.uc'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
