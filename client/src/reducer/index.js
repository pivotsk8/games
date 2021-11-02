import {
    GET_ALL_GAMES,
    SET_PAGE,
    SET_NAME,
    GET_GAME,
    SET_ORDER,
    SET_RATING,
    GET_GENRE,
   SET_FILTER
} from "../action/actions"

const inizialstate = {
    games: [],
    game:{},
    page: 1,
    order: "",
    name: "",
    rating: 0,
    genre:[]
}

function rootReducer(state = inizialstate, { type, payload }) {
    switch (type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                games: payload
            }

        case SET_PAGE:
            return {
                ...state,
                page: payload
            }
        case SET_RATING:
            return {
                ...state,
                rating: payload
            }

        case SET_NAME:
            return {
                ...state,
                name:payload
            } 
        case SET_ORDER:
            return {
                ...state,
                order:payload
            } 
        case GET_GAME:
            return {
                ...state,
                game:payload
            }
       
        case GET_GENRE:
            return {
                ...state,
                genre:payload
            }
        case SET_FILTER:
            return {
                ...state,
                games:payload.filter(el => el.genres.find(el => el.name === type.payload))
            }
       
            

        default:
            return state


    }
}
export default rootReducer;