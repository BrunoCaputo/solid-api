import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from '@/errors/user-already-exists.error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users.repository.im'

import { RegisterUseCase } from './register.uc'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password123',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'

    const register = async () => {
      await registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'password123',
      })
    }

    register() // First call

    await expect(register).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
