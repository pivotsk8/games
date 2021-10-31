import {
    GET_ALL_GAMES,
    SET_PAGE,
    SET_NAME,
    GET_GAME,
    SET_ORDER
} from "../action/actions"

const inizialstate = {
    games: [],
    game:{},
    page: 1,
    order: "",
    name: ""
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

        default:
            return state


    }
}
export default rootReducer;