import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware'

import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { register } from './register.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated user
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
