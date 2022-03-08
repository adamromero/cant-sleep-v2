import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Admin = ({ images }) => {
   const [username, setUsername] = useState("adamromero");
   const navigate = useNavigate();

   useEffect(() => {
      let decodedToken;

      try {
         if (localStorage.getItem("token")) {
            decodedToken = jwt_decode(localStorage.getItem("token"));
         }
      } catch (error) {
         console.error(error);
      }

      if (!decodedToken) {
         navigate("/login");
      }
   }, []);

   const handleLogOut = () => {
      if (localStorage.getItem("token")) {
         localStorage.removeItem("token");
         navigate("/login");
      }
   };
   return (
      <section className="content">
         <h1 className="text-center">Administration Page</h1>
         <div className="admin-content">
            <div>
               <h2>Welcome {username}</h2>
               <button className="button" onClick={handleLogOut}>
                  Log out
               </button>
            </div>

            <h2>Edit the categories below:</h2>
            <div className="admin-content__category">
               <div className="admin-content__category-container">
                  <a className="admin-content__link" href="/admin_legends">
                     {images.legends && (
                        <img
                           src={images.legends}
                           alt="Urban Legends"
                           width="150"
                        />
                     )}
                     <div>Urban Legends</div>
                  </a>
                  <a className="admin-content__link" href="/admin_mysteries">
                     {images.mysteries && (
                        <img
                           src={images.mysteries}
                           alt="Unsolved Mysteries"
                           width="150"
                        />
                     )}
                     Unsolved Mysteries
                  </a>
                  <a className="admin-content__link" href="/admin_videos">
                     {images.videos && (
                        <img
                           src={images.videos}
                           alt="Weird Videos"
                           width="150"
                        />
                     )}
                     Weird Videos
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Admin;
