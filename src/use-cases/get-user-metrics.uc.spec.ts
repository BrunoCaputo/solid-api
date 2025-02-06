import { beforeEach, describe, expect, it } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins.repository.im'

import { GetUserMetricsUseCase } from './get-user-metrics.uc'

let checkInsRepository: CheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get user check ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
