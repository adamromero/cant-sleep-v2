import React from "react";

const Admin = () => {
   return (
      <section className="content">
         <h1 className="page-heading">Admin Page</h1>
         <div className="admin-content">
            <form action="/logout" method="POST">
               <button className="button" type="submit">
                  Logout
               </button>
            </form>
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
