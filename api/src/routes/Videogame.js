const { Router } = require('express')
const router = Router()
const {getAll,postGame,getID} = require('../controllers/videogame')


router.get('/',getAll)
router.get('/:id',getID)
router.post('/',postGame)


module.exports = router;