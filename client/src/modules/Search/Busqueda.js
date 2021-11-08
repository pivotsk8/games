import React, { useState } from 'react'
import { setName, getAllGame, setPag } from '../../action/actions'
import { useDispatch } from "react-redux"
import style from "./style.module.css"

function Search() {
    const [name, setInput] = useState("")
    const dispatch = useDispatch()

    const handleOnChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(setName(name))
        dispatch(getAllGame({ page:1,name:name }))
        dispatch(setPag(1))
        setInput("")
        
    }
    
    
    return (
        <form onSubmit={onSubmit}>
            <input className={style.input} type="text" placeholder="search name" onChange={handleOnChange} value={name} />
            <button className={style.search} type="submit">Search</button>

        </form>
    )
}

export default Search