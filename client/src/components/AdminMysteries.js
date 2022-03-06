import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminMysteries = () => {
   const [data, setData] = useState([]);
   const [title, setTitle] = useState("");
   const [thumbnail, setThumbnail] = useState("");
   const [story, setStory] = useState("");
   const [message, setMessage] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem("token")) {
         navigate("/login");
      } else {
         fetch("http://localhost:5000/mysteries")
            .then((response) => response.json())
            .then((result) => setData(result.data));
      }
   }, []);

   const addEntry = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("story", story);

      try {
         const response = await fetch("http://localhost:5000/mysteries", {
            method: "POST",
            body: formData,
         });

         if (response.status === 200) {
            setTitle("");
            setThumbnail("");
            setStory("");
         } else {
            console.log("400 bad request");
         }
      } catch (error) {
         console.error(error);
      }
   };

   const deleteEntry = (id) => {
      fetch(`http://localhost:5000/mysteries/${id}`, {
         method: "DELETE",
      }).then(() => setMessage("Entry deleted"));
   };

   return (
      <div>
         <h1>Admin Mysteries</h1>
         <h2>Mysteries</h2>
         <div className="flex-table">
            {data.map((mystery) => (
               <div className="flex-row" key={mystery._id}>
                  <div className="flex-column">{mystery.title}</div>
                  <div className="flex-column">
                     <img src={mystery.thumbnail} alt="" />
                  </div>
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
