import { PrismaGymsRepository } from '@/repositories/impl/prisma-gyms.repository'

import { SearchGymsUseCase } from '../search-gyms.uc'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository)

  return searchGymsUseCase
}
