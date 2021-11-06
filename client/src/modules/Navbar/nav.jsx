import React from "react";
import Search from "../Search/Busqueda.js"
import { NavLink } from "react-router-dom";
import style from "./style.module.css"


function navBar() {
    return (
        <nav className={style.navbar}>
            <div>
                <h5>logo</h5>
            </div>
            <div className={style.filter}>
                <Search />
                <NavLink to="/home"> home</NavLink>
                <NavLink to="/form">create</NavLink>
            </div>


        </nav>

    )
}

export default navBar;