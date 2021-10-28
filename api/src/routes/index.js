const { Router } = require('express');
const GameRoute= require('./Videogame')
const Genres= require('./Genre')
const router = Router();


router.use("/videogames",GameRoute)
router.use("/genres",Genres)




module.exports = router;
