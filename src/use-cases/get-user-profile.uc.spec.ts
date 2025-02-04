import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users.repository.im'
import { UsersRepository } from '@/repositories/users.repository'

import { GetUserProfileUseCase } from './get-user-profile.uc'

let usersRepository: UsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('password123', 6),
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should be able to get user profile with wrong id', async () => {
    const getUserProfile = async () => {
      await getUserProfileUseCase.execute({
        userId: 'wrong-id',
      })
    }

    await expect(getUserProfile).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
