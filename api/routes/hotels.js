const { Router } = require('express')

const router = Router()

const hotels = [
  {
    id: 1,
    name: 'Hotel Enjoy',
    address: '宮崎県宮崎市××12-34',
    phone: '0123-45-6789',
    mapcode: '',
    coordinate: [null, null],
    credit: true,
    availability: null
  },
  {
    id: 2,
    name: 'ホテル アレクサンドロス',
    address: '宮崎県宮崎市〇〇9-99',
    phone: '0987-65-4321',
    mapcode: '',
    coordinate: [null, null],
    credit: false,
    availability: null
  }
]

/* GET users listing. */
router.get('/hotels', function(req, res, next) {
  res.json(hotels)
})

/* GET user by ID. */
router.get('/hotels/:id', function(req, res, next) {
  const id = parseInt(req.params.id)
  const hotel = hotels.filter((x) => x.id == id)
  if (hotel.length == 1) {
    res.json(hotel[0])
  } else if (hotel.length == 0) {
    res.sendStatus(404)
  } else {
    res.sendStatus(500)
  }
})

module.exports = router
