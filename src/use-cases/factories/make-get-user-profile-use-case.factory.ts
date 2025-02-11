import { PrismaUsersRepository } from '@/repositories/impl/prisma-users.repository'

import { GetUserProfileUseCase } from '../get-user-profile.uc'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
