/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './checkin';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'js gym',
      description: '',
      phone: '',
      latitude: -23.4913792,
      longitude: -46.8647936
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.4913792,
      userLongitude: -46.8647936
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2000, 0, 12, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.4913792,
      userLongitude: -46.8647936
    })

    await expect(async () => {
      await sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -23.4913792,
        userLongitude: -46.8647936
      })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2000, 0, 12, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.4913792,
      userLongitude: -46.8647936
    })

    vi.setSystemTime(new Date(2000, 0, 14, 10, 0, 0))
    
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.4913792,
      userLongitude: -46.8647936
    })

    expect(checkIn.user_id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'js gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.4577198),
      longitude: new Decimal(-46.8356051)
    })

    await expect(async () => {
      await sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -23.4913792,
        userLongitude: -46.8647936
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })

})