const express = require('express');
const router = express.Router()

const productsControllers = require('./src/controllers/productsController')

router.post('/products', productsControllers.create)
router.put('/products/:id', productsControllers.update)

router.get('/products', productsControllers.index)
router.get('/products/:id', productsControllers.show)

router.delete('/products/:id', productsControllers.delete)
router.delete('/products', productsControllers.deleteAll)

router.delete('/products', (req, res) => res.status(400).json({ message: 'Parameter not found(Bad request)' }))

module.exports = router