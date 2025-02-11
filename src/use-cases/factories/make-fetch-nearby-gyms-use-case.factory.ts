import { PrismaGymsRepository } from '@/repositories/impl/prisma-gyms.repository'

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms.uc'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)

  return fetchNearbyGymsUseCase
}
