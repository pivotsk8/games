
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllGame, setPag ,getGenre} from "../../action/actions";
import Card from "../Card/Card.js"


const Pagprincipal = () => {
    const dispatch = useDispatch()
    const { games, page, order, name } = useSelector(state => state)



    useEffect(() => {
        dispatch(getAllGame({}))
        dispatch(getGenre())

    }, [dispatch])

    const changepag = (page) => {
        dispatch(getAllGame({ page, name, order }))
        dispatch(setPag(page))
    }

    return (

        <div>
            {
                games?.concats?.length > 0 && games?.concats?.map((e, i) => {

                    return (
                        <div key={i}>
                            <Card name={e.name} id={e.id} key={e.id} image={e.background_image} gener={e.Genres?.map((el) => <li>{el}</li>)} />
                           
                        </div>)
                })
            }


            <button disabled={page - 1 === 0} onClick={() => { changepag(page - 1) }}>previous</button>
            <label>{page}</label>
            <button disabled={games?.count <= (page * 2)} onClick={() => { changepag(page + 1) }}>next</button>
        </div>
    )
}

export default Pagprincipal