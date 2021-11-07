import React,{ useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGenre } from "../../action/actions";
import style from './style.module.css'


const LandingPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenre())
    }, [dispatch])

    return (
        <div className={style.landing}>
            <NavLink to="/home"className={style.nav} > Inicio </NavLink>
        </div>
    )
}

export default LandingPage;