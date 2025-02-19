import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface AuthenticatedUserResponse {
  token: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
): Promise<AuthenticatedUserResponse> {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
