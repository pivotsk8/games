const { Videogame, Genres } = require('../db')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const { KEY } = process.env;

const getAll = async (req, res, next) => {
    try {
        let {
            order,
            page,
            name,
            rating,
        } = req.query

        let get, gamebd, concats
        // let gamebd
        // let concats = []
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
                id: games.id,
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
            include: {
                model: Genres,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        gamebd= gamebd.map(e=> {
            return{
            id: e.id,
            name: e.name,
            date: e.released,
            rating: e.rating_top,
            description:e.description,
            platforms: e.platforms,
            background_image: e.background_image,
            genre: e.Genres.map(genre => genre.name)
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
       //----------------- #rating------------------------------
        // if (order || rating) {
        //     if (order === "asc" || !order || order === "") {
        //         concats = concats.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) })
        //     }
        //     if (order === "desc") {
        //         concats = concats.sort((a, b) => { return b.name.toLowerCase().localeCompare(a.name.toLowerCase()) })
        //     }
        //     if (order === "top") {
        //         concats = concats.sort((a, b) => b.rating - a.rating)
        //     }
        //     if (order === "bottom") {
        //         concats = concats.sort((a, b) => a.rating - b.rating)
        //     }

        // }

        //----------------- #rating------------------------------
        if (rating==="top"){
            concats = concats.sort((a, b) => b.rating - a.rating)
        }
        concats = concats.sort((a, b) => a.rating - b.rating)

        //-------------------order----------------
        if(order === "asc" || !order || order === ""){
            concats = concats.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) })
        } else if(order ==="desc"){
            concats = concats.sort((a, b) => { return b.name.toLowerCase().localeCompare(a.name.toLowerCase()) })
        }
        
     //-------------------------------#order------------------
        // if (order === "asc" || !order || order === "") {
        //     concats = concats.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) })
        // } else if (order === "desc") {
        //     concats = concats.sort((a, b) => { return b.name.toLowerCase().localeCompare(a.name.toLowerCase()) })
        // } else if (order === "top") {
        //     concats = concats.sort((a, b) => b.rating - a.rating)
        // } else if (order === "bottom") {
        //     concats = concats.sort((a, b) => a.rating - b.rating)
        // }


        // #pag
        if (page) {
            concats = concats.slice((gamexpag * (page - 1)), (gamexpag * (page - 1) + gamexpag))
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

    //const { name, description, rating, platforms, genres,background_image,date,genres } = req.body
    // if (!name || !description || !platforms) {
    //     return res.status(400).send("te falta un elemento")
    // }
    // try {
    //     const game = await Videogame.create({
    //         id: uuidv4(),
    //         name: name,
    //         background_image: background_image,
    //         description: description,
    //         rating: rating,
    //         date:date,
    //         platforms: platforms.join(' , '),
    //     })
    //     if (genres) {
    //         const genresDb = await Genres.findAll({
    //             where: {
    //                 name: genres,
    //             },

    //             attributes: [
    //                 'id'
    //             ],

    //         })
    //         newGame.addGenres(genresDb)
    //     }
    //     return res.status(200).json(newGame); 
    // } catch (error) {
    //     next(error)
    // } 

    try {
        const { name, description, rating, platforms, background_image, date, genres } = req.body
        let obj = {
            name: name,
            rating: rating,
            platforms: platforms,
            date: date,
            description: description,
            background_image: background_image || "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png"
        }
        if (!name || !description || !platforms) {
            return res.status(400).send("te falta un elemento")
        }
        const game = await Videogame.create({ ...obj, id: uuidv4() })
        const genre = await Genres.findAll({ where: { name: genres } })
        await game.addGenres(genre)

        res.json(game)

    } catch (error) {
        next(error)
    }

}

const getID = async (req, res, next) => {
    const { id } = req.params
    let game;
    try {
        if (isNaN(id)) {
            game = await Videogame.findByPk(id)
        } else {
            game = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`)).data
        }
        return res.send(game)
    } catch (error) {
        next(error)
    }


}



module.exports = { getAll, postGame, getID };