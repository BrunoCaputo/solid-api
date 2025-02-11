import { PrismaCheckInsRepository } from '@/repositories/impl/prisma-check-ins.repository'

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history.uc'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    checkInsRepository,
  )

  return fetchUserCheckInsHistoryUseCase
}
