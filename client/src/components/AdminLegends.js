import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EntryModal from "./EntryModal";
import DeleteModal from "./DeleteModal";
import LoadingSpin from "react-loading-spin";

const AdminLegends = () => {
   const [data, setData] = useState([]);
   const [entry, setEntry] = useState([]);
   const [entryId, setEntryId] = useState("");
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [entryIsOpen, setEntryIsOpen] = useState(false);
   const [isNewEntry, setIsNewEntry] = useState(false);
   const [isLoading, setLoading] = useState(true);

   const navigate = useNavigate();

   const endpoint = "legends";

   useEffect(() => {
      if (!localStorage.getItem("token")) {
         navigate("/login");
      } else {
         fetch(`http://localhost:5000/${endpoint}`)
            .then((response) => response.json())
            .then((result) => setData(result.data));

         setLoading(false);
      }
   }, []);

   const deleteEntryModal = (id) => {
      setModalIsOpen(true);
      setEntryId(id);
   };

   const updateEntryModal = (id) => {
      const entry = data.filter((entry) => entry._id === id)[0];
      setEntryIsOpen(true);
      setEntry(entry);
   };

   const addEntryModal = () => {
      setEntry("");
      setIsNewEntry(true);
      setEntryIsOpen(true);
   };

   return (
      <>
         <div className="admin">
            <h1 className="text-center">Urban Legends</h1>
            <h2>Administration</h2>

            {isLoading ? (
               <div className="spinner">
                  <LoadingSpin
                     duration="2s"
                     width="15px"
                     timingFunction="ease-in-out"
                     direction="alternate"
                     size="200px"
                     primaryColor="#ac8dd9"
                     secondaryColor="#333"
                     numberOfRotationsInAnimation={2}
                  />
               </div>
            ) : (
               <>
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
                                 <img
                                    src={legend.thumbnail}
                                    alt={legend.title}
                                 />
                              </div>
                              <div className="flex-column flex-column--truncate">
                                 <div className="flex-story">
                                    {legend.story}
                                 </div>
                              </div>
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
               </>
            )}
         </div>
         <EntryModal
            endpoint={endpoint}
            entry={entry}
            setEntry={setEntry}
            isOpen={entryIsOpen}
            setEntryIsOpen={setEntryIsOpen}
            isNewEntry={isNewEntry}
         />
         <DeleteModal
            endpoint={endpoint}
            entryId={entryId}
            isOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
         />
      </>
   );
};

export default AdminLegends;
