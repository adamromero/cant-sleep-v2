import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EntryModal from "./EntryModal";
import DeleteModal from "./DeleteModal";
import LoadingSpin from "react-loading-spin";

const AdminContent = ({ data, endpoint }) => {
   const [entry, setEntry] = useState([]);
   const [entryId, setEntryId] = useState("");
   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
   const [entryModalOpen, setEntryModalOpen] = useState(false);
   const [isNewEntry, setIsNewEntry] = useState(false);
   //const [isLoading, setLoading] = useState(true);

   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem("token")) {
         navigate("/login");
      }
   }, []);

   const deleteEntryModal = (id) => {
      setDeleteModalOpen(true);
      setEntryId(id);
   };

   const updateEntryModal = (id) => {
      const entry = data.filter((entry) => entry._id === id)[0];
      setEntryModalOpen(true);
      setEntry(entry);
   };

   const addEntryModal = () => {
      setEntry("");
      setIsNewEntry(true);
      setEntryModalOpen(true);
   };

   return (
      <>
         <div className="admin">
            <h1 className="text-center">Urban Legends</h1>
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
               {data.map((legend) => (
                  <div className="flex-row" key={legend._id}>
                     <div className="flex-content">
                        <div className="flex-column flex-column--title">
                           {legend.title}
                        </div>
                        <div className="flex-column flex-column--image">
                           <img src={legend.thumbnail} alt={legend.title} />
                        </div>
                        {endpoint !== "videos" && (
                           <div className="flex-column flex-column--truncate">
                              <div className="flex-story">{legend.story}</div>
                           </div>
                        )}
                     </div>
                     <div className="admin-update-row">
                        <button
                           className="admin__button admin__button--update"
                           onClick={() => updateEntryModal(legend._id)}
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
         </div>
         <EntryModal
            endpoint={endpoint}
            entry={entry}
            setEntry={setEntry}
            isOpen={entryModalOpen}
            setEntryModalOpen={setEntryModalOpen}
            isNewEntry={isNewEntry}
         />
         <DeleteModal
            endpoint={endpoint}
            entryId={entryId}
            isOpen={deleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
         />
      </>
   );
};

export default AdminContent;
