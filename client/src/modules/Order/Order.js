import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGame, setOrder, setRating, getFilter } from '../../action/actions'
import style from "./style.module.css"


function Order() {
    const { name, page, genre, } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSelect = (e) => {
        dispatch(setRating(e.target.value))
        dispatch(setOrder(e.target.value))
        dispatch(getAllGame({ name, page, order: e.target.value, rating: e.target.value }))
    }
    const handleSelectFilter = (e) => {
        dispatch(getFilter(e.target.value))

    }


    return (
        <div className={style.fil}>
            <div>
                <select className={style.selects} onChange={handleSelect} name="order">
                    <option>order</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc" >Descendente</option>
                </select>
            </div>
            <div >
                <select className={style.selects} onChange={handleSelect} name="order">
                    <option>rating</option>
                    <option value="top">Top</option>
                    <option value="bottom" >Bottom</option>
                </select>
            </div>
            <div  >
                <select className={style.selects} onChange={handleSelectFilter} >
                    <option value="">all Genres</option>

                    {genre.map((e, i) => {
                        return (
                            <option key={i} value={e.name}>{e.name}</option>
                        )
                    })} </select>
            </div>
        </div>
    )
}

export default Order