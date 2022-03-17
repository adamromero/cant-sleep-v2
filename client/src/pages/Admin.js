import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthState";

const Admin = ({ images }) => {
   const { username, handleLogout } = useContext(AuthContext);
   const navigate = useNavigate();

   useEffect(() => {
      if (!username) {
         navigate("/login");
      }
   }, [username]);

   return (
      <section className="content">
         <h1 className="text-center">Administration Page</h1>
         <div className="admin-content">
            <div>
               <h2>Welcome {username}</h2>
               <button className="button" onClick={handleLogout}>
                  Log out
               </button>
            </div>

            <h2>Edit the categories below:</h2>
            <div className="admin-content__category">
               <div className="admin-content__category-container">
                  <a className="admin-content__link" href="/admin_legends">
                     {images.legends && (
                        <img
                           src={`https://cant-sleep-images.s3.us-west-1.amazonaws.com/${images.legends}`}
                           alt="Urban Legends"
                           width="150"
                        />
                     )}
                     <div>Urban Legends</div>
                  </a>
                  <a className="admin-content__link" href="/admin_mysteries">
                     {images.mysteries && (
                        <img
                           src={`https://cant-sleep-images.s3.us-west-1.amazonaws.com/${images.mysteries}`}
                           alt="Unsolved Mysteries"
                           width="150"
                        />
                     )}
                     Unsolved Mysteries
                  </a>
                  <a className="admin-content__link" href="/admin_videos">
                     {images.videos && (
                        <img
                           src={`https://cant-sleep-images.s3.us-west-1.amazonaws.com/${images.videos}`}
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
