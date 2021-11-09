import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGenre, getAllGame } from "../../action/actions";
import style from './style.module.css'
import image from "./start.png"

const LandingPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenre())
        dispatch(getAllGame({}))
    }, [dispatch])

    return (
        <div className={style.landing}>
            <NavLink to="/home">
                <img className={style.nav} src={image} />
            </NavLink>
        </div>
    )
}

export default LandingPage;