import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
   return (
      <header className="header highlight-off">
         <h1 className="header-heading">
            <Link
               to="/"
               className="header-heading__link"
               aria-label="Home page"
            >
               Can't Sleep?
            </Link>
         </h1>
      </header>
   );
};

export default Header;
