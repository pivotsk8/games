const { Router } = require('express')
const router = Router()
const {getAll,postGame} = require('../controllers/videogame')


router.get('/',getAll)
router.post('/',postGame)


module.exports = router;