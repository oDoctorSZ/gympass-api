import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Search Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll (async () => {
    await app.close()
  })

  it('should be able to search for a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
    .post('/gyms/create')
    .auth(token, { type: 'bearer' })
    .send({
      title: 'js gym',
      description: 'Some desc',
      phone: '1199999999',
      latitude: -23.4577198,
      longitude: -46.8356051
    })

    await request(app.server)
    .post('/gyms/create')
    .auth(token, { type: 'bearer' })
    .send({
      title: 'ts gym',
      description: 'Some desc',
      phone: '1199999999',
      latitude: -23.4577198,
      longitude: -46.8356051
    })

    const searchReponse = await request(app.server)
    .get('/gyms/search')
    .auth(token, { type: 'bearer' })
    .query({
      q: 'ts',
      page: 1
    })
    .send()

    const { gyms } = searchReponse.body

    expect(searchReponse.statusCode).toEqual(200)
    expect(gyms).toHaveLength(1)
  })
})