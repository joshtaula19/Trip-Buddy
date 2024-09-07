import express from 'express'
import request from 'superagent'

const router = express.Router()
router.get('/', async (req, res) => {
  const {content}=req.body
  try {
    const hotels = await request.get('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city')
    .query({
      cityCode: content,
      radius: 5,
      radiusUnit: 'KM',
      ratings: 5,
      hotelSource: 'ALL'
    })
    .set('Authorization', 'Bearer A8pm6l18swbpQ7vDkHExGrFTLAnc')
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attraction data' })
  }
})