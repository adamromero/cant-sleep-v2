import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthState";

const Navigation = () => {
   const { isAuthenticated } = useContext(AuthContext);

   return (
      <nav className="mobile-navigation-menu is-open">
         <ul className="menu-list">
            <li className="menu-list__item">
               <Link to="/urban_legends">Urban Legends</Link>
            </li>
            <li className="menu-list__item">
               <Link to="/unsolved_mysteries">Unsolved Mysteries</Link>
            </li>
            <li className="menu-list__item">
               <Link to="/weird_videos">Weird Videos</Link>
            </li>
            {isAuthenticated && (
               <li className="menu-list__item">
                  <Link to="/admin">Admin</Link>
               </li>
            )}
         </ul>
         <div className="menu-icon-container show-for-mobile">
            <div className="menu-icon">
               <span></span>
               <span></span>
               <span></span>
               <span></span>
            </div>
         </div>
      </nav>
   );
};

export default Navigation;
