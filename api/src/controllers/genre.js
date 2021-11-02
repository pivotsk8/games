const { Genres } = require('../db')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const { KEY } = process.env;

const getGenre = async (req, res, next) => {
    try {
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        let genreApi = (await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`)).data.results.map(e => e.name).filter(onlyUnique)
        genreApi = genreApi
        let genreDb = await Genres.findAll()

        if (genreDb.length > 0) {
            res.send(genreDb.map((e) => {
                return {
                    name: e.name,
                    id:e.id
                }
            }))
        }

        genreApi = await Promise.all(genreApi.filter(onlyUnique).map(e => Genres.findOrCreate({
            where: {
                name: e,
                id: uuidv4()
            }
        })))

        res.send(
            genreApi)
    } catch (error) {
        next(error);
    }
}
module.exports = { getGenre }