import React from "react";
import Search from "../Search/Busqueda.js"
import { NavLink } from "react-router-dom";
import style from "./style.module.css"
import logo from "./logo.png"


function navBar() {
    return (
        <nav className={style.navbar}>
            <div >
                <img className={style.logo} src={logo}/>
            </div>
            <div className={style.filter}>
                <NavLink className={style.nav}to="/home"> home</NavLink>
                <Search />
                <NavLink className={style.nav} to="/form">create</NavLink>
            </div>


        </nav>

    )
}

export default navBar;