/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) : Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDate = dayjs(date).endOf('date')

    const hasUserFindedOnDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDate)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (hasUserFindedOnDate) {
      return hasUserFindedOnDate
    }

    return null
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
    .filter((item) => item.user_id === userId)
    .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}