import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users.repository.im'
import { UsersRepository } from '@/repositories/users.repository'

import { AuthenticateUseCase } from './authenticate.uc'

let usersRepository: UsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('password123', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    const auth = async () => {
      await authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: 'password123',
      })
    }

    await expect(auth).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('password123', 6),
    })

    const auth = async () => {
      await authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    }

    await expect(auth).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
