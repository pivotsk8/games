import React from 'react';
import { NavLink } from "react-router-dom";


const LandingPage = () => {
    
    return (
        <div className="landing">
            <NavLink to="/home" > <img className="logo" src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABcb0yL8KdS3lxlB7w7kD6GfBTivnVVTfpiW0ZQTi6nvwWZIEpS5rU5iFeO_kJxGzEDnOaLx7iq0zM3FJc5e1gGqEGcaCkNotiOAl.png?r=d7f" alt="to home"/> </NavLink>
        </div>
    )
}

export default LandingPage;