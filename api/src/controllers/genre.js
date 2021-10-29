const { Genres } = require('../db')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const { KEY } = process.env;

const getGenre = async (req, res, next) => {
    try {
        let genreApi = (await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`)).data.results.map(e => e.name)
        let genreDb = await Genres.findAll()

        if (genreDb.length > 0) {
            res.send(genreDb.map((e) => {
                return {
                    name: e.name,
                    id:e.id
                }
            }))
        }

        genreApi = await Promise.all(genreApi.map(e => Genres.findOrCreate({
            where: {
                name: e,
                id: uuidv4()
            }
        })))

        res.send(genreApi)
    } catch (error) {
        next(error);
    }
}
module.exports = { getGenre }