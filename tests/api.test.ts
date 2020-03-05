import supertest from 'supertest'
import app from '../api/index'
require('dotenv').config()

describe('areas', (): void => {
  it('areas', async () => {
    const request = supertest(app.handler)
    const response = await request.get('/areas')
    expect(response.body.length).toBe(3)
    expect(response.body[0].name).toBe('宮崎市')
  })

  it('area', async () => {
    const request = supertest(app.handler)
    const response = await request.get('/area?id=1')
    expect(response.body[0].name).toBe('一番街周辺')
  })
})

// describe('hotels', (): void => {
//   it('hotels', async () => {
//     const request = supertest(app.handler)
//     let response = await request.get('/hotels')
//     expect(response.body.length).toBe(28)

//     response = await request.get('/hotels?detail_area=0')
//     expect(response.body.length).toBe(28)

//     response = await request.get('/hotels?detail_area=2')
//     expect(response.body.length).toBe(3)
//   })

//   it('hotels/1', async () => {
//     const request = supertest(app.handler)
//     const response = await request.get('/hotels/1')
//     expect(response.body[0].name).toBe('ホテル アーク')
//   })
// })

