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
console.log(game)
    return (
        <div>
            <button onClick={goBack}>Back</button>
           
            {
                typeof game?.id ==="number"?
                <>
                    <h1>{game.name}</h1>
                    <p>{game.description.replace(/<[^>]*>?/g, "")}</p>
                    <img src={game.background_image} alt=""/>
                    <h3>{game.genres.map(e=>e.name)}</h3>
                    <h3>{game.platforms.map(e=>e.platform.name)}</h3>
                    <h3>{game.released}</h3>
                    <h3>{game.rating}</h3>
                </>: game?.Genres?
                 <>
                 <h1>{game.name}</h1>
                 <p>{game.description}</p>
                 <img src={game.image} alt=""/>
                 <h3>{game.date}</h3>
                 <h3>{game.rating}</h3>
                 <h3>{game.Genres.map(e=>e.name)}</h3>
                 <h3>{game.platforms}</h3>
             </>:
                <h1>Loading...</h1>
            }
        </div>
    )
        }

export default Game