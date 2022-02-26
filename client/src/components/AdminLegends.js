import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminLegends = () => {
   const [data, setData] = useState([]);
   const [title, setTitle] = useState("");
   const [thumbnail, setThumbnail] = useState("");
   const [story, setStory] = useState("");
   const [message, setMessage] = useState("");

   useEffect(() => {
      fetch("http://localhost:5000/legends")
         .then((response) => response.json())
         .then((result) => setData(result.data));
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("story", story);

      try {
         const response = await fetch("http://localhost:5000/legends", {
            method: "POST",
            body: formData,
         });

         if (response.status === 200) {
            setTitle("");
            setThumbnail("");
            setStory("");
            console.log("successful upload");
         } else {
            console.log("400 bad request");
         }
      } catch (error) {
         console.error(error);
      }
   };

   const deleteEntry = (id) => {
      fetch(`http://localhost:5000/legends/${id}`, {
         method: "DELETE",
      }).then(() => setMessage("Entry deleted"));
   };

   return (
      <div>
         <h1>Admin Legends</h1>
         <h2>Legends</h2>
         <div className="flex-table">
            {data.map((legend) => (
               <div className="flex-row" key={legend._id}>
                  <div className="flex-column">{legend.title}</div>
                  <div className="flex-column">
                     <img src={legend.thumbnail} alt="" />
                  </div>
                  <div className="flex-column">{legend.story}</div>
                  <Link key={legend._id} to={`/update_legend/${legend._id}`}>
                     Update
                  </Link>
                  <button onClick={() => deleteEntry(legend._id)}>
                     Delete
                  </button>
               </div>
            ))}
         </div>
         <div>{message}</div>

         <form className="admin-form" onSubmit={handleSubmit}>
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
            <label htmlFor="">Story:</label>
            <textarea
               rows="6"
               name="story"
               value={story}
               onChange={(e) => setStory(e.target.value)}
            />
            <button className="admin-button">Submit</button>
         </form>
      </div>
   );
};

export default AdminLegends;
