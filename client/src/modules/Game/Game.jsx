import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getGame } from '../../action/actions'
import style from "./style.module.css"


const Game = (props) => {
    const { id } = props.match.params
    const { game } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getGame(id))
    }, [dispatch, id])

    const goBack = () => {
        history.goBack()
    }
   
    return (
        <div className={style.container}>
            <button onClick={goBack}>Back</button>

            {
                typeof game?.id === "number" ?
                    <>
                        <h1>{game.name}</h1>
                        <img className={style.img} src={game.background_image} alt="" />
                        <div>
                            <h3>{game.genres.map(e => e.name).join(" ")}</h3>
                            <h3>{game.platforms.map(e => e.platform.name).join(' , ')}</h3>
                            <h3>{game.released}</h3>
                            <h3>{game.rating}</h3>
                        </div>
                        <div>
                            <p className={style.description}>{game.description.replace(/<[^>]*>?/g, "")}</p>
                        </div>
                    </> : game?.Genres ?
                        <>
                            <h1>{game.name}</h1>
                            <img src={game.image} alt="" />
                            <div>
                                <h3>{game.Genres.map(e => e.name)}</h3>
                                <h3>{game.platforms}</h3>
                                <h3>{game.rating}</h3>
                                <h3>{game.date}</h3>
                            </div>
                            <p className={style.description}>{game.description}</p>
                        </> :
                        <h1>Loading...</h1>
            }
        </div>
    )
}

export default Game