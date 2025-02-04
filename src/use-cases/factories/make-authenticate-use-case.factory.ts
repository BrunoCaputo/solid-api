import { PrismaUsersRepository } from '@/repositories/impl/prisma-users.repository'

import { AuthenticateUseCase } from '../authenticate.uc'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
