import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Create Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll (async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gymResponse = await request(app.server)
    .post('/gyms/create')
    .auth(token, { type: 'bearer' })
    .send({
      title: 'js gym',
      description: 'Some desc',
      phone: '1199999999',
      latitude: -23.4577198,
      longitude: -46.8356051
    })

    expect(gymResponse.statusCode).toEqual(201)
  })
})