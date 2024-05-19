/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UsersRepository } from '@/repositories/users-repository'

// Variables named 'sut' === System Under Test.
// Just save for who doesn't know ;)

let usersRepository: UsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
     }
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

     await expect(async () => {
      await sut.execute({
        email: 'johndoe@example.com',
        password: '123123'
      })
     }
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })


})