const express = require('express')
const router = express.Router()

const beerController = require('../controllers/beerController')

router.post('/beers', beerController.create)
router.get('/beers', beerController.getAll)
router.get('/beers/:id', beerController.get)
router.put('/beers/:id', beerController.update)
router.delete('/beers/:id', beerController.delete)

module.exports = router