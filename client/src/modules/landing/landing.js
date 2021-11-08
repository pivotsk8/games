import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGenre, getAllGame } from "../../action/actions";
import style from './style.module.css'


const LandingPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenre())
        dispatch(getAllGame({}))
    }, [dispatch])

    return (
        <div className={style.landing}>
            <NavLink to="/home">
                <img src="C:\Users\USER\Desktop\games\client\src\modules\landing\KEY0.CC-Press-Start-Png-Press-Start-Pixel-Png.png" />
            </NavLink>
        </div>
    )
}

export default LandingPage;