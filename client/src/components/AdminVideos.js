import React, { useState, useEffect } from "react";

const AdminVideos = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      fetch("http://localhost:5000/videos")
         .then((response) => response.json())
         .then((result) => setData(result.data));
   }, []);

   return (
      <div>
         <h1>Admin Videos</h1>
         <h2>Videos</h2>
         <div className="flex-table">
            {data.map((legend) => (
               <div className="flex-row" key={legend._id}>
                  <div className="flex-column">{legend.title}</div>
                  <div className="flex-column">{legend.thumbnail}</div>
                  <div className="flex-column">{legend.urlId}</div>
               </div>
            ))}
         </div>

         <form className="admin-form" action="">
            <label htmlFor="">Title:</label>
            <input type="text" name="title" placeholder="Enter title" />
            <label htmlFor="">Image:</label>
            <input type="file" name="thumbnail" id="" />
            <label htmlFor="">Video ID:</label>
            <input type="text" name="urlId" placeholder="Enter ID" />
            <button className="admin-button">Submit</button>
         </form>
      </div>
   );
};

export default AdminVideos;
