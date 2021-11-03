const { Router } = require('express')
const router = Router()
const {getAll,postGame,getID} = require('../controllers/videogame')


router.get('/',getAll)
router.get('/:id',getID)
router.post('/add',postGame)


module.exports = router;