import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateVideo = () => {
   const { id } = useParams();

   const [data, setData] = useState({ title: "", thumbnail: "", urlId: "" });
   const [message, setMessage] = useState("");

   const { title, thumbnail, urlId } = data;

   useEffect(() => {
      fetch(`http://localhost:5000/videos/${id}`)
         .then((response) => response.json())
         .then((result) => setData(result.data))
         .catch((error) => console.error(error));
   }, []);

   const updateEntry = (e) => {
      e.preventDefault();

      fetch(`http://localhost:5000/videos/${id}`, {
         method: "PUT",
         body: JSON.stringify({
            title,
            urlId,
         }),
         headers: { "Content-Type": "application/json" },
      })
         .then(() => setMessage("Updated"))
         .catch((error) => console.error(error));
   };

   const onChange = (e) => {
      const { name, value } = e.target;

      setData((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   return (
      <div>
         <h1>Update Video</h1>
         <form className="admin-form" onSubmit={updateEntry}>
            <label htmlFor="">Title:</label>
            <input
               type="text"
               name="title"
               value={title}
               onChange={(e) => onChange(e)}
               placeholder="Enter title"
            />
            <label htmlFor="">Image:</label>
            <input type="file" name="thumbnail" id="" />
            <label htmlFor="">Video ID:</label>
            <input
               type="text"
               name="urlId"
               value={urlId}
               onChange={(e) => onChange(e)}
               placeholder="Enter ID"
            />
            <button className="admin-button">Submit</button>
         </form>
         <div>{message}</div>
      </div>
   );
};

export default UpdateVideo;
