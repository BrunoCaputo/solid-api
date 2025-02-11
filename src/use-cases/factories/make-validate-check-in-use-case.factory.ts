import { PrismaCheckInsRepository } from '@/repositories/impl/prisma-check-ins.repository'

import { ValidateCheckInUseCase } from '../validate-check-in.uc'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckInUseCase
}
