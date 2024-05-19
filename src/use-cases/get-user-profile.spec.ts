/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

// Variables named 'sut' === System Under Test.
// Just save for who doesn't know ;)

let usersRepository: UsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user', async () => {
    const testUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: testUser.id
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        userId: 'userid-01'
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})