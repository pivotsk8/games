const { Genres } = require('../db')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const { KEY } = process.env;

const getGenre = async (req, res, next) => {
    try {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        let genreApi = (await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`)).data.results.filter(onlyUnique).map(e => e.name)
        //genreApi = genreApi
        let genreDb = await Genres.findAll()

        if (genreDb.length > 0) {
            res.send(genreDb.map((e) => {
                return {
                    name: e.name,
                    id: e.id,
                }
            }))
        }else{

        genreApi = await Promise.all(genreApi.map(e => Genres.create({
        
                name: e,
                id: uuidv4()
            
        })
        ))}

        res.send(
            genreApi,
           )


    } catch (error) {
        next(error);
    }

}
module.exports = { getGenre }