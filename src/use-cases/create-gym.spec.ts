/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

// Unit Testing / Isolated

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'js gym',
      description: null,
      phone: null,
      latitude: -23.4577198,
      longitude: -46.8356051
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})