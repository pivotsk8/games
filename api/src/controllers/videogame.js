const { Videogame, Genres, Op } = require('../db')
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


        var result, gamebd, concats, console, concats2
        page = page ? page : 1
        const gamexpag = 15;

        if (name && name !== "") {
            name = name.split(" ").map(element =>
                element.charAt(0).toUpperCase() + element.slice(1)).join(" ")
            result = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`)).data.results
            //platforms = result.flat().map(game =>game.platforms)
            result = result.map(games => {
                return {
                    id: games.id,
                    name: games.name,
                    date: games.released,
                    rating: games.rating_top,
                    description: games.description,
                    platforms: games.platforms.map(plat => plat.platform.name),
                    image: games.background_image,
                    Genres: games.genres.map(genre => genre.name)
                }
            })





            result = result.filter(game => game.name.includes(name))

            gamebd = await Videogame.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            concats = gamebd.concat(result)

        } else {
            const apione = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=1`)
            const apitwo = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=2`)
            const apithree = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=3`)
            //const apithree = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=3`)
            let result = await Promise.all([apione, apitwo, apithree])
            result = result.map(i => i.data.results)
            console = result.flat().map(game => game.platforms)
            result = result.flat().map(games => {
                return {
                    id: games.id,
                    name: games.name,
                    date: games.released,
                    rating: games.rating_top,
                    description: games.description,
                    platforms: games.platforms.map(plat => plat.platform.name),
                    image: games.background_image,
                    Genres: games.genres.map(genre => genre.name)
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
            gamebd = gamebd.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    date: e.date,
                    rating: e.rating,
                    description: e.description,
                    platforms: e.platforms,
                    image: e.image,
                    Genres: e.Genres.map(genre => genre.name)
                }
            })
            concats = gamebd.concat(result)
            concats2 = concats
        }


        //#name
        // if (name) {
        //     name = name.toLowerCase()
        //     console.log
        //     get = get.filter(game => game.name.toLowerCase().includes(name))
        //     gamebd = gamebd.filter(game => game.name.toLowerCase().includes(name))
        //     concats = gamebd.concat(get)
        // } else {
        //     concats = gamebd.concat(get)
        // }
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

        if (rating === "top") {
            concats = concats.sort((a, b) => b.rating - a.rating)
        } else if (order === "bottom") {
            concats = concats.sort((a, b) => a.rating - b.rating)
        }

        //-------------------order----------------
        if (order === "asc" || !order || order === "") {
            concats = concats.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) })
        } else if (order === "desc") {
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
            count2: 15,
            count: concats.length,
            concats: concats,
            console: console,
            concats2: concats2
        })

    } catch (error) {
        next(error)
    }

}

const postGame = async (req, res, next) => {

    const { name, description, rating, platforms, genres, background_image, date } = req.body
    if (!name || !description || !platforms) {
        return res.status(400).send("te falta un elemento")
    }
    try {
        const game = await Videogame.create({
            id: uuidv4(),
            name: name,
            image: background_image || "https://scontent.fbog2-5.fna.fbcdn.net/v/t1.6435-9/103530467_120118446393287_6263146579495375817_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeG54nZqp-VpyfyQIb0nVow7Bh9fLjzkwCwGH18uPOTALJSgEgsCjQ9BRm8XQ3-YpM0&_nc_ohc=SPDSNMioCEsAX_ttK_R&_nc_ht=scontent.fbog2-5.fna&oh=a1a4fd58556d28bc7669cb7a30fcc71c&oe=61A73A30",
            description: description,
            rating: rating,
            date: date,
            platforms: platforms.join(' , '),
        })
        if (genres) {
            const genresDb = await Genres.findAll({
                where: {
                    name: genres,
                },

                attributes: [
                    'id'
                ],

            })
            game.addGenres(genresDb)
        }
        return res.status(200).json({ ...game, genres });
    } catch (error) {
        next(error)
    }


    // try {
    //     const { name, description, rating, platforms, image, date, genres } = req.body
    //     let obj = {
    //         id: uuidv4(),
    //         name: name,
    //         rating: rating,
    //         platforms: platforms,
    //         date: date,
    //         description: description,
    //         background_image: image || "https://scontent.fbog2-5.fna.fbcdn.net/v/t1.6435-9/103530467_120118446393287_6263146579495375817_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeG54nZqp-VpyfyQIb0nVow7Bh9fLjzkwCwGH18uPOTALJSgEgsCjQ9BRm8XQ3-YpM0&_nc_ohc=SPDSNMioCEsAX_ttK_R&_nc_ht=scontent.fbog2-5.fna&oh=a1a4fd58556d28bc7669cb7a30fcc71c&oe=61A73A30"
    //     }
    //     if (!name || !description || !platforms) {
    //         return res.status(400).send("te falta un elemento")
    //     }
    //     const game = await Videogame.create({ ...obj,  })
    //     const genre = await Genres.findAll({ name: genres } )
    //     console.log(genres)
    //     await game.addGenres(genre)

    //     res.json(game)

    // } catch (error) {
    //     next(error)
    // }


    // const { name, description, rating, platforms, image, date, genres } = req.body
    // let game = {
    //     id: uuidv4(),
    //     name: name,
    //     rating: rating,
    //     platforms: platforms,
    //     date: date,
    //     description: description,
    //     background_image: image || "https://scontent.fbog2-5.fna.fbcdn.net/v/t1.6435-9/103530467_120118446393287_6263146579495375817_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeG54nZqp-VpyfyQIb0nVow7Bh9fLjzkwCwGH18uPOTALJSgEgsCjQ9BRm8XQ3-YpM0&_nc_ohc=SPDSNMioCEsAX_ttK_R&_nc_ht=scontent.fbog2-5.fna&oh=a1a4fd58556d28bc7669cb7a30fcc71c&oe=61A73A30"
    // }
    // Videogame.create(game)
    //     .then(game => {
    //         game.addGenres(genres)
    //         res.json({ game, genres })
    //     })
    //     .catch((error) => next(error))

    console.log(game)

}

const getID = async (req, res, next) => {
    const { id } = req.params
    let game;
    try {
        if (isNaN(id)) {
            game = await Videogame.findByPk(id, {
                include: {
                    model: Genres,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            })
            //   game=[game].map(e => {
            //         return {
            //             id: e.id,
            //             name: e.name,
            //             date: e.date,
            //             rating: e.rating,
            //             description: e.description,
            //             platforms: e.platforms,
            //             image: e.background_image,
            //             Genres: e.Genres.map(genre => genre.name)
            //         }
            //     })



        } else {
            game = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`)).data

        }
        return res.send(game)
    } catch (error) {
        next(error)
    }


}



module.exports = { getAll, postGame, getID };