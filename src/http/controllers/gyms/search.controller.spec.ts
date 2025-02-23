import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.util'

describe('Search gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 01',
        description: 'Gym 01 description',
        phone: '1199999999',
        latitude: 0,
        longitude: 0,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 02',
        description: 'Gym 02 description',
        phone: '1188888888',
        latitude: 1,
        longitude: 1,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'Gym' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(2)
    // expect(response.body.gyms).toEqual([
    //   expect.objectContaining({ title: 'Gym 01' }),
    //   expect.objectContaining({ title: 'Gym 02' }),
    // ])
  })
})
