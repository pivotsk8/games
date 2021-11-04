
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllGame, setPag, getGenre } from "../../action/actions";
import Card from "../Card/Card.js"


const Pagprincipal = () => {
    const dispatch = useDispatch()
    const { filtergames, page, order, name } = useSelector(state => state)



    useEffect(() => {
        dispatch(getAllGame({}))
        dispatch(getGenre())
    }, [])

    const changepag = (page) => {
        dispatch(getAllGame({ page, name, order }))
        dispatch(setPag(page))
    }

console.log(filtergames,"este es el filter")
    return (

        <div>
            {
                filtergames?.concats?.length > 0 && filtergames?.concats?.map((e) => {

                    return (

                        <Card name={e.name} id={e.id} key={e.id} image={e.background_image} gener={e.Genres?.map((el, i) => <li key={i}>{el}</li>)} />

                    )
                })
            }


            <button disabled={page - 1 === 0} onClick={() => { changepag(page - 1) }}>previous</button>
            <label>{page}</label>
            <button disabled={filtergames?.count <= (page * 2)} onClick={() => { changepag(page + 1) }}>next</button>
        </div>
    )
}

export default Pagprincipal