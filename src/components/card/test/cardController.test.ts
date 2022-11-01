import { app } from '../../../index'
import supertest from 'supertest'

const api = supertest(app)

jest.setTimeout(100000)

describe.skip('/card/token', () => {
  test('probando que guarde las tarjetas y genere el token', async () => {
    const card = {
      email: 'rommer@hotmail.com',
      ccv: '123',
      expiration_month: '12',
      expiration_year: '2027',
      card_number: '4551038338995199'
    }

    const { body } = await api
      .post('/card/token')
      .send(card)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('Token creado exitosamente')
    expect(body.data.token).toContain('pk_test_')
    expect(body.data.token).toHaveLength(24)
  })

  test('probando ingresar algun dato invalido', async () => {
    const card = {
      email: 'rommer@hotmail.coml',
      ccv: '123',
      expiration_month: '12',
      expiration_year: '2027',
      card_number: '4551038338995199'
    }

    await api
      .post('/card/token')
      .send(card)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
  test('probando ingresar sin enviar datos', async () => {
    await api
      .post('/card/token')
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
})

describe.skip('/card', () => {
  test('obteniendo datos de la tarjeta con token correcto', async () => {
    const token: string = 'pk_test_6TaxUZzZUTTBKQg1'
    const { body } = await api
      .get('/card')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('consulta exitosa')
  })
  test('obteniendo datos de la tarjeta con token invalido', async () => {
    const token: string = 'pk_test_ZsHm0mFIMMp3uD8Kasf32Q'
    await api
      .get('/card')
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
  test('obteniendo datos de la tarjeta con token expirado', async () => {
    const token: string = 'pk_test_ZsHm0mFIMMp3uD8K'
    await api
      .get('/card')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
  test('obteniendo datos de la tarjeta sin token', async () => {
    await api
      .get('/card')
      .expect(403)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
})
