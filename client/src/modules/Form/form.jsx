import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenre, createGame, getAllGame } from '../../action/actions';
import style from "./style.module.css";


const Form = () => {
    const dispatch = useDispatch();
    const { genre, allGames, page, order } = useSelector(state => state);
    //const { genre, allGames} = useSelector(state => state);



    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    //let array = allGames.console.map(e => e.map(platform => platform.platform.name)).flat().filter(onlyUnique)


    const [game, setGame] = useState({
        name: '',
        description: '',
        date: '',
        rating: 0,
        background_image: '',
        genres: [],
        platforms: [],
    });
    useEffect(() => {
        dispatch(getGenre())
        dispatch(getAllGame({}))
    }, [dispatch])


    const onSubmit = (e) => {
        if (!game.name || !game.description || !game.platforms) {
            return alert('Name, Description and Platform fields cant be empty')
        } else {
            e.preventDefault();
            dispatch(createGame(game))
            dispatch(getAllGame({}))
            dispatch(getAllGame({ page, order }))
            window.location.reload(false)
        }

    }

    const handleOnChange = (e) => {
        setGame({
            ...game,
            [e.target.name]: e.target.value,

        })

    }
    function handleOnGenre(e) {
        if (game.genres.includes(e.target.value)) {
            let newgenre = game.genres.filter(ep => ep !== e.target.value)
            setGame({
                ...game,
                genres: newgenre
            })
        } else {
            setGame({
                ...game,
                genres: [...game.genres, e.target.value]
            })
        }
    }

    function handleOnPlatform(e) {
        if (game.platforms.includes(e.target.value)) {
            let newplatform = game.platforms.filter(ep => ep !== e.target.value)
            setGame({
                ...game,
                platforms: newplatform
            })
        } else {
            setGame({
                ...game,
                platforms: [...game.platforms, e.target.value]
            })
        }
    }

    // const handleOnChange = (e)=>{
    //     if(game.Genres.includes(e.target.value)){
    //        let newgenre = game.Genres.filter(ep => ep !== e.target.value)
    //         setGame({
    //             ...game,
    //            Genres: newgenre
    //         })
    //     }else{
    //         setGame({
    //             ...game,
    //             Genres: [game.Genres, e.target.value]
    //         })
    //     }
    // }


    return (
        allGames?.console?.length > 0 ?
            <form className={style.container} onSubmit={onSubmit}>
                <label >name</label>
                <input value={game.name} onChange={handleOnChange} name="name" type="text" />


                <label >platforms:</label>
                <label> <select name="platform" onChange={handleOnPlatform}>
                    {/* {array.map(e => <option value={e}>{e}</option>)} */}
                    {allGames.console.map(e => <option value={e}>{e}</option>)}
                </select>
                    <p className={style.color}>{game.platforms}</p> </label>


                <label >date: </label>
                <input value={game.date} onChange={handleOnChange} name="date" type="date" />

                <label >Rating</label>
                <input value={game.rating} onChange={handleOnChange} name="rating" min="0" max="5" type="number" />

                <label >Description</label>
                <input value={game.description} onChange={handleOnChange} name="description" type="text" />

                <label >Image</label>
                <input value={game.image} onChange={handleOnChange} name="image" type="text" />

                <label>genre:</label>
                <label> <select onChange={handleOnGenre} name="genres" >
                    {genre.length > 0 &&
                        genre.map((e) => (
                            <option key={e.id} value={e.name}>{e.name}</option>
                        ))
                    }
                </select>
                    <p className={style.color}>{game.genres}</p>
                </label>

                <input type="submit" value="Create" />
            </form> : <h5>loadin...</h5>
    )


}

export default Form;