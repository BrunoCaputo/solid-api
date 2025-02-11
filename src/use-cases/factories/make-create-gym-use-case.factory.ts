import { PrismaGymsRepository } from '@/repositories/impl/prisma-gyms.repository'

import { CreateGymUseCase } from '../create-gym.uc'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)

  return createGymUseCase
}
