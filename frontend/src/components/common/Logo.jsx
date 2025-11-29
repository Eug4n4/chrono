import { Link } from "react-router-dom";
import s from "./header.module.css";
import React from "react";

const Logo = () => {
    return (
        <Link to={"/"} className={`${s.nav_link} ${s.logo}`}>
            CHRONOS
        </Link>
    );
};

export default Logo;