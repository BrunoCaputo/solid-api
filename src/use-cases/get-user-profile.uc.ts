import { User } from '@prisma/client'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UsersRepository } from '@/repositories/users.repository'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface getUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<getUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
