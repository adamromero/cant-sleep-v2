import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Admin = () => {
   const [username, setUsername] = useState("");
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
         <h1 className="page-heading">Administration Page</h1>
         <div className="admin-content">
            <div>
               <button className="button" onClick={handleLogOut}>
                  Logout
               </button>
            </div>
            <h2>Edit the categories below:</h2>
            <div className="admin-content__category">
               <div className="admin-content__category-container">
                  <a className="admin-content__link" href="/admin_legends">
                     <img src="" alt="" />
                     <div>Urban Legends</div>
                  </a>
                  <a className="admin-content__link" href="/admin_mysteries">
                     Unsolved Mysteries
                  </a>
                  <a className="admin-content__link" href="/admin_videos">
                     Weird Videos
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Admin;
