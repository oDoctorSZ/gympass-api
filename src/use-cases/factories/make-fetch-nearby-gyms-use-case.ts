import { FetchNearbyGymUseCase } from "../fetch-nearby-gyms"
import { PrismaGymsRepositoty } from "@/repositories/prisma/prisma-gyms-repository"

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepositoty()
  const useCase = new FetchNearbyGymUseCase(gymsRepository)

  return useCase
}