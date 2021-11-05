
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllGame, setPag, getGenre } from "../../action/actions";
import Card from "../Card/Card.js"
import style from "./style.module.css";


const Pagprincipal = () => {
    const dispatch = useDispatch()
    const { allGames, filtergames, page, order, name } = useSelector(state => state)



    useEffect(() => {
        dispatch(getAllGame({}))
        dispatch(getGenre())
    }, [], filtergames)

    const changepag = (page) => {
        dispatch(getAllGame({ page, name, order }))
        dispatch(setPag(page))
    }



    return (

        <div className={style.container} >
            {
                //allGames?.concats?.length > 0 && allGames?.concats?.map((e) => {
                //allGames?.concats2?.length > 0 && allGames?.concats2?.map((e) => {
                filtergames?.concats?.length > 0 && filtergames?.concats?.map((e) => {
                    // filtergames?.concats2?.length > 0 && filtergames?.concats2?.map((e) => {

                    return (
                        // <Card name={e.name} id={e.id} key={e.id} image={e.image} gener={e.Genres?.map((el, i) => <li className={style.li} key={i}>{el}</li>)} />
                        <Card name={e.name} id={e.id} key={e.id} image={e.image} gener={e.Genres.slice(0, 3)?.map((el, i) => <li className={style.li} key={i}>{el}</li>)} />

                    )
                })
            }

            <div className={style.page}>
                <button className={style.back} disabled={page - 1 === 0} onClick={() => { changepag(page - 1) }}>back</button>
                <label className={style.pag}>{page}</label>
                {/* <button disabled={allGames?.count <= (page * 2)} onClick={() => { changepag(page + 1) }}>next</button> */}
                <button className={style.next} disabled={filtergames?.count <= (page * 2)} onClick={() => { changepag(page + 1) }}>next</button>
            </div>
        </div>
    )
}

export default Pagprincipal