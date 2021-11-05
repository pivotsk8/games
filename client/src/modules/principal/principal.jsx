
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllGame, setPag, getGenre } from "../../action/actions";
import Card from "../Card/Card.js"


const Pagprincipal = () => {
    const dispatch = useDispatch()
    const { allGames,filtergames, page, order, name } = useSelector(state => state)



    useEffect(() => {
        dispatch(getAllGame({}))
        dispatch(getGenre())
    }, [],filtergames)

    const changepag = (page) => {
        dispatch(getAllGame({ page, name, order }))
        dispatch(setPag(page))
    }


    return (

        <div>
            {
                //allGames?.concats?.length > 0 && allGames?.concats?.map((e) => {
                //allGames?.concats2?.length > 0 && allGames?.concats2?.map((e) => {
                filtergames?.concats?.length > 0 && filtergames?.concats?.map((e) => {
               // filtergames?.concats2?.length > 0 && filtergames?.concats2?.map((e) => {

                    return (

                        <Card name={e.name} id={e.id} key={e.id} image={e.background_image} gener={e.Genres?.map((el, i) => <li key={i}>{el}</li>)} />

                    )
                })
            }


            <button disabled={page - 1 === 0} onClick={() => { changepag(page - 1) }}>previous</button>
            <label>{page}</label>
            <button disabled={allGames?.count <= (page * 2)} onClick={() => { changepag(page + 1) }}>next</button>
            {/* <button disabled={filtergames?.count <= (page * 2)} onClick={() => { changepag(page + 1) }}>next</button> */}
        </div>
    )
}

export default Pagprincipal