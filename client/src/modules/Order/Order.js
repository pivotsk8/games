import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGame,setOrder } from '../../action/actions'


function Order() {
    const { name, page } = useSelector(state=> state)
    const dispatch = useDispatch()

    const handleSelect = (e)=>{
       dispatch(setOrder(e.target.value))
        dispatch(getAllGame({name, page, order:e.target.value}))
    }

    return (
        <div>
            <select onChange={handleSelect}>
                <option selected value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
        </div>
    )
}

export default Order