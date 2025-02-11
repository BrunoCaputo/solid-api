import { beforeEach, describe, expect, it } from 'vitest'

import { GymsRepository } from '@/repositories/gyms.repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms.repository.im'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.uc'

let gymsRepository: GymsRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near 01',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Far 02',
      description: null,
      phone: null,
      latitude: 20,
      longitude: 20,
    })

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near 01' })])
  })
})
