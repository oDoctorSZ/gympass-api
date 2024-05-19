import { CreateGymUseCase } from "../create-gym"
import { PrismaGymsRepositoty } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepositoty()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}