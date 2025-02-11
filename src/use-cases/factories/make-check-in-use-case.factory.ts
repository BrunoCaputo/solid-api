import { PrismaCheckInsRepository } from '@/repositories/impl/prisma-check-ins.repository'
import { PrismaGymsRepository } from '@/repositories/impl/prisma-gyms.repository'

import { CheckInUseCase } from '../check-in.uc'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}
