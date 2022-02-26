import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminVideos = () => {
   const [data, setData] = useState([]);
   const [title, setTitle] = useState("");
   const [thumbnail, setThumbnail] = useState("");
   const [urlId, setUrlId] = useState("");
   const [message, setMessage] = useState("");

   useEffect(() => {
      fetch("http://localhost:5000/videos")
         .then((response) => response.json())
         .then((result) => setData(result.data));
   }, []);

   const addEntry = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("urlId", urlId);

      try {
         const response = await fetch("http://localhost:5000/videos", {
            method: "POST",
            body: formData,
         });

         if (response.status === 200) {
            setTitle("");
            setThumbnail("");
            setUrlId("");
         } else {
            console.log("400 bad request");
         }
      } catch (error) {
         console.error(error);
      }
   };

   const deleteEntry = (id) => {
      fetch(`http://localhost:5000/videos/${id}`, {
         method: "DELETE",
      }).then(() => setMessage("Entry deleted"));
   };

   return (
      <div>
         <h1>Admin Videos</h1>
         <h2>Videos</h2>
         <div className="flex-table">
            {data.map((video) => (
               <div className="flex-row" key={video._id}>
                  <div className="flex-column">{video.title}</div>
                  <div className="flex-column">
                     <img src={video.thumbnail} alt="" />
                  </div>
                  <div className="flex-column">{video.urlId}</div>
                  <Link key={video._id} to={`/update_video/${video._id}`}>
                     Update
                  </Link>
                  <button onClick={() => deleteEntry(video._id)}>Delete</button>
               </div>
            ))}
         </div>
         <div>{message}</div>

         <form className="admin-form" onSubmit={addEntry}>
            <label htmlFor="">Title:</label>
            <input
               type="text"
               name="title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Enter title"
            />
            <input
               type="file"
               name="thumbnail"
               onChange={(e) => {
                  setThumbnail(e.target.files[0]);
               }}
            />
            <label htmlFor="">Video ID:</label>
            <input
               type="text"
               name="urlId"
               value={urlId}
               onChange={(e) => setUrlId(e.target.value)}
               placeholder="Enter ID"
            />
            <button className="admin-button">Submit</button>
         </form>
      </div>
   );
};

export default AdminVideos;
