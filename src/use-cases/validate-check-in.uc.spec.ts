import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins.repository.im'

import { ValidateCheckInUseCase } from './validate-check-in.uc'

let checkInsRepository: CheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent the check-in', async () => {
    const doCheckInValidation = async () => {
      await validateCheckInUseCase.execute({
        checkInId: 'inexistent-check-in-id',
      })
    }

    await expect(doCheckInValidation).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2025, 1, 10, 20, 0, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const moreThan20MinInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(moreThan20MinInMs)

    const doCheckInValidation = async () => {
      await validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      })
    }

    await expect(doCheckInValidation).rejects.toBeInstanceOf(
      LateCheckInValidationError,
    )
  })
})
