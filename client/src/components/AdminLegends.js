import React, { useState, useEffect } from "react";

const AdminLegends = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      fetch("http://localhost:5000/legends")
         .then((response) => response.json())
         .then((result) => setData(result.data));
   }, []);

   return (
      <div>
         <h1>Admin Legends</h1>
         <h2>Legends</h2>
         <div className="flex-table">
            {data.map((legend) => (
               <div className="flex-row" key={legend._id}>
                  <div className="flex-column">{legend.title}</div>
                  <div className="flex-column">{legend.thumbnail}</div>
                  <div className="flex-column">{legend.story}</div>
               </div>
            ))}
         </div>

         <form className="admin-form" action="">
            <label htmlFor="">Title:</label>
            <input type="text" name="title" placeholder="Title" />
            <label htmlFor="">Image:</label>
            <input type="file" name="thumbnail" id="" />
            <label htmlFor="">Story:</label>
            <textarea rows="6" name="story" />
            <button className="admin-button">Submit</button>
         </form>
      </div>
   );
};

export default AdminLegends;
