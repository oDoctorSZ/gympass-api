import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Nearby Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll (async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
    .post('/gyms/create')
    .auth(token, { type: 'bearer' })
    .send({
      title: `Near Gym`,
      description: 'null',
      phone: 'null',
      latitude: -23.4577198,
      longitude: -46.8356051
    })

    await request(app.server)
    .post('/gyms/create')
    .auth(token, { type: 'bearer' })
    .send({
      title: `Far Gym`,
      description: 'null',
      phone: 'null',
      latitude: -24.4577198,
      longitude: -45.8356051
    })

    const nearbyReponse = await request(app.server)
    .get('/gyms/nearby')
    .auth(token, { type: 'bearer' })
    .query({
      latitude: -23.4577198,
      longitude: -46.8356051
    })
    .send()

    const { gyms } = nearbyReponse.body

    expect(nearbyReponse.statusCode).toEqual(200)
    expect(gyms).toHaveLength(1)
  })
})