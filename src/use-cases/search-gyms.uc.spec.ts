import { beforeEach, describe, expect, it } from 'vitest'

import { GymsRepository } from '@/repositories/gyms.repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms.repository.im'

import { SearchGymsUseCase } from './search-gyms.uc'

let gymsRepository: GymsRepository
let seachGymsUseCase: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    seachGymsUseCase = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Gym 01',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Gym 02',
      description: null,
      phone: null,
      latitude: 20,
      longitude: 20,
    })

    const { gyms } = await seachGymsUseCase.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 01' }),
      expect.objectContaining({ title: 'Gym 02' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i.toString().padStart(2, '0')}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await seachGymsUseCase.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  })
})
