/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe('Search Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 4; i++) {
      await gymsRepository.create({
        title: `js gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.4577198,
        longitude: -46.8356051
      })
    }

    await gymsRepository.create({
      title: `TS gym-01`,
      description: null,
      phone: null,
      latitude: -23.4577198,
      longitude: -46.8356051
    })
    
    const { gyms } = await sut.execute({
      query: 'js',
      page: 1
    })

    expect(gyms).toHaveLength(4)
  })

})