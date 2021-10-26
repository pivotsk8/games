const { Router } = require('express')
const router = Router()
const {getAll} = require('../controllers/videogame')


router.get('/',getAll)


module.exports = router;