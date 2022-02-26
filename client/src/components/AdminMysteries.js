import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminMysteries = () => {
   const [data, setData] = useState([]);
   const [title, setTitle] = useState("");
   const [story, setStory] = useState("");

   useEffect(() => {
      fetch("http://localhost:5000/mysteries")
         .then((response) => response.json())
         .then((result) => setData(result.data));
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch("http://localhost:5000/mysteries", {
            method: "POST",
            body: JSON.stringify({
               title,
               story,
            }),
            headers: { "Content-Type": "application/json" },
         });

         if (response.status === 200) {
            setTitle("");
            setStory("");
         } else {
            console.log("400 bad request");
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div>
         <h1>Admin Mysteries</h1>
         <h2>Mysteries</h2>
         <div className="flex-table">
            {data.map((mystery) => (
               <div className="flex-row" key={mystery._id}>
                  <div className="flex-column">{mystery.title}</div>
                  <div className="flex-column">{mystery.thumbnail}</div>
                  <div className="flex-column">{mystery.story}</div>
                  <Link key={mystery._id} to={`/update_mystery/${mystery._id}`}>
                     Update
                  </Link>
                  <button onClick={() => deleteEntry(mystery._id)}>
                     Delete
                  </button>
               </div>
            ))}
         </div>

         <form className="admin-form" onSubmit={handleSubmit}>
            <label htmlFor="">Title:</label>
            <input
               type="text"
               name="title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Enter title"
            />
            <label htmlFor="">Image:</label>
            <input type="file" name="thumbnail" id="" />
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

export default AdminMysteries;
