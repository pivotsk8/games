import React from "react";
import Search from "../Search/Busqueda.js"
import Order from "../Order/Order.js";
import{NavLink} from "react-router-dom";


function navBar() {
    return (
        <nav>
            <Search/>
            <Order/>
            <div>
                <NavLink to = "/home"> home</NavLink>
            </div>
           <div>
               <NavLink to = "/form">create</NavLink>
           </div>


        </nav>
    )
}

export default navBar;