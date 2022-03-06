import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Admin = () => {
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

      console.log(decodedToken);

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
         <h1 className="page-heading">Admin Page</h1>
         <div className="admin-content">
            <div>
               <button className="button" onClick={handleLogOut}>
                  Logout
               </button>
            </div>
            <h2>Edit the categories below:</h2>
            <div className="admin-content__category">
               <a className="admin-content__link" href="/admin_legends">
                  Legends
               </a>
               <a className="admin-content__link" href="/admin_mysteries">
                  Mysteries
               </a>
               <a className="admin-content__link" href="/admin_videos">
                  Videos
               </a>
            </div>
         </div>
      </section>
   );
};

export default Admin;
