import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
   content: {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      border: "none",
      background: "#000",
      maxWidth: "500px",
      height: "500px",
      margin: "auto",
   },
   overlay: { zIndex: 1000 },
};

const EntryModal = ({ entry, setEntry, isOpen, setEntryIsOpen }) => {
   const [message, setMessage] = useState("");

   const { title, thumbnail, story } = entry;

   const closeModal = () => {
      setEntryIsOpen(false);
   };

   const updateEntry = (e) => {
      //TODO: change this code to POST depending on adding or updating data
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

      setEntry((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   return (
      <Modal
         isOpen={isOpen}
         closeTimeoutMS={500}
         onRequestClose={closeModal}
         style={customStyles}
      >
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
      </Modal>
   );
};

export default EntryModal;
