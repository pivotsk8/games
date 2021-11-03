import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getGame } from '../../action/actions'


const Game = (props) => {
    const {id} = props.match.params
    const {game} = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getGame(id))
    }, [dispatch,id])

    const goBack = () => {
        history.goBack()
    }

    return (
        <div>
            <button onClick={goBack}>Back</button>
           
            {
                game?.name?
                <>
                    <h1>{game.name}</h1>
                    <p>{game.description.replace(/<[^>]*>?/g, "")}</p>
                    <img src={game.background_image} alt=""/>
                </>:
                <h1>Loading...</h1>
            }
        </div>
    )
        }

export default Game