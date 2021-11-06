import React from "react"
import { NavLink } from "react-router-dom";
import style from "./style.module.css"

const Card = ({ image, name, id, gener, ...props }) => {
    return (
        <div {...props} className={style.container}>
            <NavLink className={style.nav} to={`/id/${id}`}>
                <div className={style.divText}>
                    <h3>{name}</h3>
                    <span>{gener}</span>
                </div>
            </NavLink>

            <div>
                <NavLink className={style.nav} to={`/id/${id}`}> <img className={style.images} src={image} alt={name} /></NavLink>
            </div>

        </div>
    )
}

export default Card;