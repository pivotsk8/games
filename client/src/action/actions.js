import axios from 'axios';
export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const SET_PAGE = "SET_PAGE"
export const SET_NAME = "SET_NAME"
export const GET_GAME = "GET_GAME"
export const SET_ORDER = "SET_ORDER"
export const SET_RATING = "SET_RATING"
export const GET_GENRE = "GET_GENRE"
export const CREATE_GAME = "CREATE_GAME"
export const SET_FILTER = "SET_FILTER"


export const getAllGame = ({ page, order, name, rating }) => {


    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames?page=${page ? page : 1}&order=${order ? order : ""}&name=${name ? name : ""}&rating=${rating ? rating : ""}`)
            .then((response) => {
                dispatch({
                    type: GET_ALL_GAMES,
                    payload: response.data
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

export const setPag = (page) => {
    return {
        type: SET_PAGE,
        payload: (page)
    }
}
export const setRating = (rating) => {
    return {
        type: SET_RATING,
        payload: (rating)
    }
}

export const setName = (name) => {
    return {
        type: SET_NAME,
        payload: (name)
    }
}
export const setOrder = (order) => {
    return {
        type: SET_ORDER,
        payload: (order)
    }
}
export const getFilter = (payload) => {
    return {
        type: SET_FILTER,
       payload: payload
    }
}

export const getGame = (id) => {
    return async (dispatch) => {
        try {
            const resul = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: GET_GAME,
                payload: resul.data,
            })
        } catch (error) {
            console.error(error)

        }
    }
}

export const getGenre = () => {
    return async (dispatch) => {
        try {
            const resul = await axios.get(`http://localhost:3001/genres`)
            return dispatch({
                type: GET_GENRE,
                payload: resul.data,
            })
        } catch (error) {
            console.error(error)

        }
    }
}

export const createGame = (game) => {
    return async (dispatch) => {
        console.log("envio",game)
        try {
            const resul = await axios.post(`http://localhost:3001/videogames/add`, game)
            return dispatch({
                type: CREATE_GAME,
                resul
            })
        } catch (error) {
            console.error(error)
        }
    }
}

