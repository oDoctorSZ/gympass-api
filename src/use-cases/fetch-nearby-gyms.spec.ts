/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymUseCase;

describe('Fetch Nearby Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymUseCase(gymsRepository)
  })

  it('should be able to fetch paginated gyms search', async () => {
    await gymsRepository.create({
      title: `Near Gym`,
      description: null,
      phone: null,
      latitude: -23.4577198,
      longitude: -46.8356051
    })

    await gymsRepository.create({
      title: `Far Gym`,
      description: null,
      phone: null,
      latitude: -24.4577198,
      longitude: -45.8356051
    })
    
    const { gyms } = await sut.execute({
      userLatitude: -23.4577198,
      userLongitude: -46.8356051
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([ expect.objectContaining({ title: 'Near Gym' }) ])
  })

})