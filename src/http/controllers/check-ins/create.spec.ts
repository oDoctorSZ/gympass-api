import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Create Check Ins (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll (async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'js gym',
        latitude: -23.4577198,
        longitude: -46.8356051,
      }
    })
    
    const checkInResponse = await request(app.server)
    .post(`/gyms/${gym.id}/check-ins`)
    .auth(token, { type: 'bearer' })
    .send({ 
      latitude: -23.4577198,
      longitude: -46.8356051
    })

    expect(checkInResponse.statusCode).toEqual(201)
  })
})