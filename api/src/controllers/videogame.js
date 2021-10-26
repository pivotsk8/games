const { Videogame, Genre } = require('../db')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const { KEY } = process.env;

const getAll = async (req, res, next) => {
    try {
        let {
            order,
            page,
        } = req.query

        let get
        let gamebd
        let concats = []
        page = page ? page : 1
        const recipexpag = 15;

        const result = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=50&page=1`)
        get = await result.data.results.map(games => {
            return {
                name: games.name,
                date: games.released,
                rating: games.rating_top,
                description: games.description,
                platforms: games.platforms.map(plat => plat.platform.name),
                background_image: games.background_image,
                genre: games.genres.map(genre => genre.name)
            }
        })
        gamebd = await Videogame.findAll({
            includes: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })

        res.send(get)
    } catch (error) {
        next(error)
    }
    cons

}
const postGame = async (req, res, next) => {
    const { name, description, rating, platforms, genres } = req.body
    if (!name || !description || !platforms) {
        return res.status(400).send("te falta un elemento")
    }
    try {
        const game = await Videogame.create({
            id: uuidv4(),
            name: name,
            background_image: background_image,
            description: description,
            released: released,
            rating: rating,
            platforms: platforms.join(' , '),
        })
    } catch (error) {
        next(error)
    }

}
module.exports = { getAll };