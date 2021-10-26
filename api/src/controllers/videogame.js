const { Videogame, Genre } = require('../db')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const { KEY } = process.env;

const getAll = async (req, res, next) => {
    try {
        let {
            order,
            page,
            name,
        } = req.query

        let get
        let gamebd
        let concats = []
        page = page ? page : 1
        const gamexpag = 15;

        // const apione = (await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=1`)).data.results
        // const apitwo = (await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=2`)).data.results
        // const apithree = (await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=20&page=3`)).data.results
        //  let result = apione.concat(apitwo.concat(apithree))
        //  console.log(result)
        const apione = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=1`)
        const apitwo = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=2`)
        const apithree = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=20&page=3`)
        let result = await Promise.all([apione, apitwo, apithree])
        result = result.map(i => i.data.results)
        get = result.flat().map(games => {
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
        concats = gamebd.concat(get)

        
        //#name
        if (name) {
            name = name.toLowerCase()
            console.log
            get = get.filter(game => game.name.toLowerCase().includes(name))
            gamebd = gamebd.filter(game => game.name.toLowerCase().includes(name))
            concats = gamebd.concat(get)
        } else {
            concats = gamebd.concat(get)
        }
        //#pag
        if (page) {
            concats = concats.slice((gamexpag * (page-1)), (gamexpag * (page - 1) + gamexpag))
        }
        
        //#order
        if (order === "asc" || !order || order === "") {
            concats = concats.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) })
        } else {
            concats = concats.sort((a, b) => { return b.name.toLowerCase().localeCompare(a.name.toLowerCase()) })
        }

        res.send({
            count: concats.length,
            concats: concats
        })

    } catch (error) {
        next(error)
    }
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

const getID = async (req, res, next) => {

}



module.exports = { getAll, postGame };