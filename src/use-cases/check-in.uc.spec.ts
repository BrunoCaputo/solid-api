import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { MaxDistanceError } from '@/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { GymsRepository } from '@/repositories/gyms.repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins.repository.im'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms.repository.im'

import { CheckInUseCase } from './check-in.uc'

let checkInsRepository: CheckInsRepository
let gymsRepository: GymsRepository
let checkInUseCase: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    const checkInFn = async () => {
      await checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 0,
        userLongitude: 0,
      })
    }

    vi.setSystemTime(new Date(2025, 1, 6, 18, 0, 0))

    await checkInFn()

    await expect(checkInFn).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    const checkInFn = async () => {
      return await checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 0,
        userLongitude: 0,
      })
    }

    vi.setSystemTime(new Date(2025, 1, 6, 18, 0, 0))
    await checkInFn()

    vi.setSystemTime(new Date(2025, 1, 7, 18, 0, 0))
    const { checkIn } = await checkInFn()

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Gym 02',
      description: '',
      latitude: 0,
      longitude: 0,
      phone: '',
    })

    const checkInFn = async () => {
      return await checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: 20,
        userLongitude: 20,
      })
    }

    await expect(checkInFn).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
