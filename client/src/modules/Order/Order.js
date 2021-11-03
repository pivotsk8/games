import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGame, setOrder, setRating, getFilter } from '../../action/actions'


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
        <div>
            <div> <label>Order</label>
                <select onChange={handleSelect} name="order">
                    <option value="asc">Ascendente</option>
                    <option value="desc" >Descendente</option>
                </select>
            </div>
            <div>
                <label>Ranting</label><select onChange={handleSelect} name="order">
                    <option value="top">Top</option>
                    <option value="bottom" >Bottom</option>
                </select>
            </div>
            <div>
                <select onChange={handleSelectFilter} >
                    <option >Genre</option>
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