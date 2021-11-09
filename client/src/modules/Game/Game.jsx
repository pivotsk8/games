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
        <div >

            <button onClick={goBack} className={style.button}>Back</button>
            {
                typeof game?.id === "number" ?
                    <div className={style.container}>
                        <h1>{game.name}</h1>
                        <img className={style.img} src={game.background_image} alt="" />

                        <div className={style.container2}>

                            <label className={style.genres2}>
                                <h4>Genres:</h4>
                                {game.genres.map(e => e.name).join(" ")}
                            </label>

                            <label className={style.genres}>
                                <h4>Platforms:</h4>
                                {game.platforms.map(e => e.platform.name).join(' , ')}
                            </label>

                            <div className={style.info}>
                                <label>
                                    <h4>date:</h4>
                                    {game.released}
                                </label>
                                <label>
                                    <h4>rating:</h4>
                                    {game.rating}
                                </label>

                            </div>
                        </div>
                        <div>
                            <p className={style.description}>{game.description.replace(/<[^>]*>?/g, "")}</p>
                        </div>
                        {/* ----------------------------------- BD ----------------------------------- */}
                    </div> : game?.Genres ?
                        <div className={style.container}>
                            <h1>{game.name}</h1>
                            <img className={style.img} src={game.image} alt="" />

                            <div className={style.container2}>
                                <label className={style.genres2}>
                                    <h4>Genres:</h4>
                                    {game.Genres.map(e => e.name).join(" ")}
                                </label>
                                <label className={style.genres}>
                                    <h3>Platforms:</h3>
                                    {game.platforms}
                                </label>

                                <div className={style.info}>
                                    <label>
                                        <h4>date:</h4>
                                        {game.date}
                                    </label>
                                    <label>
                                        <h4>rating:</h4>
                                        {game.rating}
                                    </label>

                                </div>
                            </div>
                            <p className={style.description}>{game.description}</p>
                        </div> :
                        <h1>Loading...</h1>
            }
        </div>
    )
}

export default Game