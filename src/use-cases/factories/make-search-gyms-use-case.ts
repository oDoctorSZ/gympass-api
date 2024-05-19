import { SearchGymUseCase } from "../search-gyms"
import { PrismaGymsRepositoty } from "@/repositories/prisma/prisma-gyms-repository"

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepositoty()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}