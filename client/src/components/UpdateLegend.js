import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const UpdateLegend = () => {
   const { id } = useParams();

   const [data, setData] = useState({ title: "", thumbnail: "", story: "" });
   const [message, setMessage] = useState("");

   const { title, thumbnail, story } = data;

   useEffect(() => {
      fetch(`http://localhost:5000/legends/${id}`)
         .then((response) => response.json())
         .then((result) => setData(result.data))
         .catch((error) => console.error(error));
   }, []);

   const updateEntry = (e) => {
      e.preventDefault();

      fetch(`http://localhost:5000/legends/${id}`, {
         method: "PUT",
         body: JSON.stringify({
            title,
            story,
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
         <h1>Update Legend</h1>
         <Link to="/admin_legends">Back</Link> <Link to="/admin">Admin</Link>
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
            <label htmlFor="">Story:</label>
            <textarea
               rows="6"
               name="story"
               value={story}
               onChange={(e) => onChange(e)}
            />
            <button className="admin-button">Submit</button>
         </form>
         <div>{message}</div>
      </div>
   );
};

export default UpdateLegend;