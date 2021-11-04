import React from "react"
import { NavLink } from "react-router-dom";
import style from "./style.module.css"

const Card = ({ image, name, id, gener, ...props }) => {

    return (
        <div {...props} >
            <h1>{name}</h1>
            <NavLink to={`/id/${id}`}><img className={style.images} src={image} alt={name} /></NavLink>
            <span>{gener}</span>

        </div>
    )
}

export default Card;