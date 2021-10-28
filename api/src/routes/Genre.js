const { Router } = require('express')
const router = Router()
const {getGenre} = require('../controllers/genre')


router.get('/',getGenre)



module.exports = router;