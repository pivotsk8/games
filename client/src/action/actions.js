import axios from 'axios';
export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const SET_PAGE = "SET_PAGE"
export const SET_NAME = "SET_NAME"
export const GET_GAME = "GET_GAME"
export const SET_ORDER = "SET_ORDER"


export const getAllGame = ({ page, order, name }) => {


    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames?page=${page ? page : 1}&order=${order ? order : ""}&name=${name?name : ""}`)
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

export const getGame=(id)=>{
    return async (dispatch)=>{
        try {
         const resul=await axios.get(`http://localhost:3001/videogames/${id}`)
         console.log(resul.data)
         return dispatch({
             type:GET_GAME,
             payload:resul.data,
            })
        } catch (error) {
            console.error(error)
            
        }
    }
}

