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

const AdminMysteries = () => {
   const [data, setData] = useState([]);
   const [entry, setEntry] = useState([]);
   const [message, setMessage] = useState("");
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [entryIsOpen, setEntryIsOpen] = useState(false);
   const [deleteEntryId, setDeleteEntryId] = useState("");
   const [isNewEntry, setIsNewEntry] = useState(false);
   const navigate = useNavigate();

   const endpoint = "mysteries";

   useEffect(() => {
      if (!localStorage.getItem("token")) {
         navigate("/login");
      } else {
         fetch(`http://localhost:5000/${endpoint}`)
            .then((response) => response.json())
            .then((result) => setData(result.data));
      }
   }, []);

   const deleteEntry = (id) => {
      fetch(`http://localhost:5000/${endpoint}/${id}`, {
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
      setIsNewEntry(true);
      setEntryIsOpen(true);
   };

   const closeModal = () => {
      setModalIsOpen(false);
   };

   return (
      <>
         <div className="admin">
            <h1 className="text-center">Unsolved Mysteries</h1>
            <h2>Administration</h2>
            <Link className="back-button" to="/admin">
               Admin Home
            </Link>
            <div>
               <button
                  className="admin__button admin__button--delete"
                  onClick={() => addEntryModal()}
               >
                  Add Entry
               </button>
            </div>
            <div className="flex-table">
               {data.map((mystery) => (
                  <div className="flex-row" key={mystery._id}>
                     <div className="flex-column flex-column--title">
                        {mystery.title}
                     </div>
                     <div className="flex-column flex-column--image">
                        <img src={mystery.thumbnail} alt={mystery.title} />
                     </div>
                     <div className="flex-column flex-column--truncate">
                        <div className="flex-story">{mystery.story}</div>
                     </div>
                     <div className="admin-update-row">
                        <button
                           className="admin__button admin__button--update"
                           onClick={() => openEntryModal(mystery._id)}
                        >
                           Update
                        </button>
                        <button
                           className="admin__button admin__button--delete"
                           onClick={() => deleteEntryModal(mystery._id)}
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <EntryModal
            endpoint={endpoint}
            entry={entry}
            setEntry={setEntry}
            isOpen={entryIsOpen}
            setEntryIsOpen={setEntryIsOpen}
            isNewEntry={isNewEntry}
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
            <div>{message}</div>
         </Modal>
      </>
   );
};

export default AdminMysteries;
