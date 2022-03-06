import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import EntryModal from "./EntryModal";

const customStyles = {
   content: {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      border: "none",
      background: "#000",
      maxWidth: "500px",
      height: "200px",
      margin: "auto",
   },
   overlay: { zIndex: 1000 },
};

const AdminLegends = () => {
   const [data, setData] = useState([]);
   const [entry, setEntry] = useState([]);
   const [title, setTitle] = useState("");
   const [thumbnail, setThumbnail] = useState("");
   const [thumbnailTitle, setThumbnailTitle] = useState("");
   const [story, setStory] = useState("");
   const [message, setMessage] = useState("");
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [entryIsOpen, setEntryIsOpen] = useState(false);
   const [deleteEntryId, setDeleteEntryId] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem("token")) {
         navigate("/login");
      } else {
         fetch("http://localhost:5000/legends")
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

   const deleteEntryModal = (id) => {
      setModalIsOpen(true);
      setDeleteEntryId(id);
   };

   const openEntryModal = (id) => {
      const entry = data.filter((entry) => entry._id === id)[0];
      setEntryIsOpen(true);
      setEntry(entry);
   };

   const addEntryModal = () => {
      setEntry("");
      setEntryIsOpen(true);
   };

   const closeModal = () => {
      setModalIsOpen(false);
   };

   return (
      <>
         <div className="admin">
            <h1 className="text-center">Urban Legends</h1>
            <h2>Administration</h2>
            <Link className="back-button" to="/admin">
               Back
            </Link>
            <button
               className="admin__button admin__button--delete"
               onClick={() => addEntryModal()}
            >
               Add Entry
            </button>
            <div className="flex-table">
               {data.map((legend) => (
                  <div className="flex-row" key={legend._id}>
                     <div className="flex-content">
                        <div className="flex-column flex-column--title">
                           {legend.title}
                        </div>
                        <div className="flex-column flex-column--image">
                           <img src={legend.thumbnail} alt={legend.title} />
                        </div>
                        <div className="flex-column flex-column--truncate">
                           <div className="flex-story">{legend.story}</div>
                        </div>
                     </div>
                     <div className="admin-update-row">
                        {/* <Link
                           className="admin__button admin__button--update"
                           key={legend._id}
                           to={`/update_legend/${legend._id}`}
                        >
                           Update
                        </Link> */}

                        <button
                           className="admin__button admin__button--update"
                           onClick={() => openEntryModal(legend._id)}
                        >
                           Update
                        </button>

                        <button
                           className="admin__button admin__button--delete"
                           onClick={() => deleteEntryModal(legend._id)}
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               ))}
            </div>
            <div>{message}</div>

            <form className="admin-form" onSubmit={addEntry}>
               <label htmlFor="">Title:</label>
               <input
                  className="admin-form__field"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
               />
               <input
                  type="file"
                  name="thumbnail"
                  id="file-upload"
                  onChange={(e) => {
                     setThumbnail(e.target.files[0]);
                     setThumbnailTitle(e.target.files[0].name);
                  }}
               />
               <label htmlFor="file-upload" className="admin-form__upload">
                  Choose File
               </label>
               {thumbnailTitle && <label htmlFor="">{thumbnailTitle}</label>}
               <label htmlFor="">Story:</label>
               <textarea
                  className="admin-form__textarea"
                  rows="15"
                  name="story"
                  placeholder="Start writing a story..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
               />
               <button type="submit" className="admin-form__submit">
                  Submit
               </button>
            </form>
         </div>
         <EntryModal
            entry={entry}
            setEntry={setEntry}
            isOpen={entryIsOpen}
            setEntryIsOpen={setEntryIsOpen}
         />
         <Modal
            isOpen={modalIsOpen}
            closeTimeoutMS={500}
            onRequestClose={closeModal}
            style={customStyles}
         >
            <p>Are you sure you want to delete this entry?</p>
            <div>
               <button onClick={closeModal}>Cancel</button>
               <button
                  onClick={() => {
                     deleteEntry(deleteEntryId);
                     closeModal();
                  }}
               >
                  Delete
               </button>
            </div>
         </Modal>
      </>
   );
};

export default AdminLegends;
