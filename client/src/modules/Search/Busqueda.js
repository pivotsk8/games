import React, { useState } from 'react'
import { setName, getAllGame, setPag } from '../../action/actions'
import { useDispatch } from "react-redux"

function Search() {
    const [name, setInput] = useState("")
    const dispatch = useDispatch()

    const handleOnChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const onSummit = (e) => {
        e.preventDefault()
        dispatch(setName(name))
        dispatch(getAllGame({ name:name }))
        dispatch(setPag(1))
        setInput("")

    }
   
    return (
        <form onSummit={onSummit}>
            <input type="text" placeholder="search name" onChange={handleOnChange} value={name} />
            <button type="submit">Search</button>

        </form>
    )
}

export default Search