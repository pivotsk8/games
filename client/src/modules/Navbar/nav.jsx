import React from "react";
import Search from "../Search/Busqueda.js"
import Order from "../Order/Order.js";
function navBar() {
    return (
        <nav>
            <div>
                <span>home</span>
            </div>
            <Search/>
            <Order/>
           <div>
               <span>create game</span>
           </div>


        </nav>
    )
}

export default navBar;