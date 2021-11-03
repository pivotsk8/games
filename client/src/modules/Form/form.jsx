import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenre, createGame, getAllGame } from '../../action/actions';

const Form = () => {
    const dispatch = useDispatch();
    const { genre, games } = useSelector(state => state);
    
 

    //var newGenre=genre.map(e=>e.name)

    const [game, setGame] = useState({
        name: '',
        description: '',
        date: '',
        rating: 0,
        background_image: '',
        genre: [],
        platform: [],
    });
    useEffect(() => {
        dispatch(getGenre())
    }, [dispatch])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createGame(game))

    }

    const handleOnChange = (e) => {
        setGame({
            ...game,
            [e.target.name]: e.target.value, 
            genre:   [game.genre,e.target.value]

        })
    }
console.log(game.genre)
console.log(game)

    return (
        <form onSubmit={onSubmit}>
            <label >name</label>
            <input value={game.name} onChange={handleOnChange} name="name" type="text" />
            <label >platforms</label>
            <input value={game.platform} onChange={handleOnChange} name="platform" type="text" />
            <label >date</label>
            <input value={game.date} onChange={handleOnChange} name="date" type="date" />
            <label >Rating</label>
            <input value={game.rating} onChange={handleOnChange} name="rating" min="0" max="5" type="number" />
            <label >Description</label>
            <input value={game.description} onChange={handleOnChange} name="description"  type="text" />
            <label >Image</label>
            <input value={game.image} onChange={handleOnChange} name="image" type="text" />
            <label>genre</label>
            <select onChange ={handleOnChange} name="genre">
                {genre.length>0 &&
                    genre.map((e) =>(
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))
                }
            </select>
            <input type="submit" value="Create"/>
        </form>
    )


}

export default Form;