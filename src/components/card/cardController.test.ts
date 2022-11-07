import { app } from '../../index'
import supertest from 'supertest'
import * as helper from './helper/helperTest'

const api = supertest(app)

jest.setTimeout(100000)

describe('probando ruta "/":GET para generar token y guardar tarjeta', () => {
  test('probando que guarde las tarjeta y genere el token', async () => {
    const { body } = await api
      .post('/')
      .send(helper.cardValid)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('Token creado exitosamente')
    expect(body.data.token).toMatch(helper.expToken)
  })
  test('probando sin enviar ningún dato', async () => {
    const { body } = await api
      .post('/')
      .send({})
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('Debe enviar todos los datos')
  })
  test('probando con email invalido', async () => {
    const { body } = await api
      .post('/')
      .send(helper.cardEmailInvalid)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('Email incorrect')
  })
  test('probando con cvv invalido', async () => {
    const { body } = await api
      .post('/')
      .send(helper.cardCVVInvalid)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('CVV incorrect')
  })
  test('probando con mes invalido', async () => {
    const { body } = await api
      .post('/')
      .send(helper.cardMonthInvalid)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('Month incorrect')
  })
  test('probando con año invalido', async () => {
    const { body } = await api
      .post('/')
      .send(helper.cardYearInvalid)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('Year incorrect')
  })
  test('probando con numero de tarjeta invalido', async () => {
    const { body } = await api
      .post('/')
      .send(helper.cardNumberInvalid)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toContain('Card number is incorrect')
  })
})

describe('probando ruta "/":POST para obtener tarjeta', () => {
  test('obteniendo datos de la tarjeta con token correcto', async () => {
    const { body } = await api
      .get('/')
      .set('Authorization', `Bearer ${helper.tokenCorrect}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.data).toStrictEqual(helper.DBCard)
  })
  test('obteniendo datos de la tarjeta sin token', async () => {
    const { body } = await api
      .get('/')
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toBe('Acceso no autorizado')
  })
  test('obteniendo datos de la tarjeta con token exipiado', async () => {
    const { body } = await api
      .get('/')
      .expect(400)
      .set('Authorization', `Bearer ${helper.expiredToken}`)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toBe(helper.msgErrorToken)
  })
  test('obteniendo datos de la tarjeta con token invalido', async () => {
    const { body } = await api
      .get('/')
      .expect(401)
      .set('Authorization', `Bearer ${helper.tokenIncorrect}`)
      .expect('Content-Type', 'application/json; charset=utf-8')

    expect(body.message).toBe('Acceso no autorizado')
  })
})
