import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins.repository.im'

import { CheckInUseCase } from './check-in.uc'

let checkInsRepository: CheckInsRepository
let checkInUseCase: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in twice in different days', async () => {
    const checkInFn = async () => {
      return await checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
      })
    }

    vi.setSystemTime(new Date(2025, 1, 6, 18, 0, 0))
    await checkInFn()

    vi.setSystemTime(new Date(2025, 1, 7, 18, 0, 0))
    const { checkIn } = await checkInFn()

    await expect(checkIn.id).toEqual(expect.any(String))
  })
})
