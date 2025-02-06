import { beforeEach, describe, expect, it } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins.repository.im'

import { CheckInUseCase } from './check-in.uc'

let checkInsRepository: CheckInsRepository
let checkInUseCase: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
