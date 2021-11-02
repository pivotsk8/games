import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGame, setOrder, setRating } from '../../action/actions'


function Order() {
    const { name, page, rating } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSelect = (e) => {
        dispatch(setRating(e.target.value))
        dispatch(setOrder(e.target.value))
        dispatch(getAllGame({ name, page, order: e.target.value, rating: e.target.value }))
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
                    <option value="botton" >Botton</option>
                </select>
            </div>
        </div>
    )
}

export default Order