import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Validate Check Ins (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll (async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'js gym',
        latitude: -23.4577198,
        longitude: -46.8356051,
      }
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        user_id: user.id,
        gym_id: gym.id
      }
    })
    
    const checkInResponse = await request(app.server)
    .patch(`/check-ins/${checkIn.id}/validate`)
    .auth(token, { type: 'bearer' })
    .send()

    expect(checkInResponse.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})