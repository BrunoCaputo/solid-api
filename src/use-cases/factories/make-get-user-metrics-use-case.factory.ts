import { PrismaCheckInsRepository } from '@/repositories/impl/prisma-check-ins.repository'

import { GetUserMetricsUseCase } from '../get-user-metrics.uc'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
