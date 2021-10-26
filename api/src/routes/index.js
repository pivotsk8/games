const { Router } = require('express');
const GameRoute= require('./Videogame')
const router = Router();


router.use("/videogames",GameRoute)




module.exports = router;
