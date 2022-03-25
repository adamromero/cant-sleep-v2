import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthState";
import { Link, useNavigate } from "react-router-dom";
import EntryModal from "../components/EntryModal";
import DeleteModal from "../components/DeleteModal";
import LoadingSpin from "react-loading-spin";
import Pusher from "pusher-js";

const PUSHER_APP_ID = "f52ae194b9517e40926d";
const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER;

const AdminContent = ({ data, title, endpoint }) => {
   const [entry, setEntry] = useState([]);
   const [entryId, setEntryId] = useState("");
   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
   const [entryModalOpen, setEntryModalOpen] = useState(false);
   const [isNewEntry, setIsNewEntry] = useState(false);
   //const [isLoading, setLoading] = useState(true);

   const [adminData, setAdminData] = useState([]);

   const { username } = useContext(AuthContext);
   const navigate = useNavigate();

   

   useEffect(() => {
      if (!username) {
         navigate("/login");
      }
      console.log("component rendered");
      setAdminData(data);

      // const pusher = new Pusher(PUSHER_APP_ID, {
      //    cluster: PUSHER_CLUSTER,
      // });

      // const channel = pusher.subscribe("data"); 
      // console.log(pusher);

   }, [username, data]);

   //console.log(adminData);

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
            <h1 className="text-center">{title}</h1>
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
               {adminData.map((entry) => (
                  <div className="flex-row" key={entry._id}>
                     <div className="flex-content">
                        <div className="flex-column flex-column--title">
                           {entry.title}
                        </div>
                        <div className="flex-column flex-column--image">
                           <img
                              src={`https://cant-sleep-images.s3.us-west-1.amazonaws.com/${entry.thumbnail}`}
                              alt={entry.title}
                           />
                        </div>
                        {endpoint !== "videos" && (
                           <div className="flex-column flex-column--truncate">
                              <div className="flex-story">{entry.content}</div>
                           </div>
                        )}
                     </div>
                     <div className="admin-update-row">
                        <button
                           className="admin__button admin__button--update"
                           onClick={() => updateEntryModal(entry._id)}
                        >
                           Update
                        </button>

                        <button
                           className="admin__button admin__button--delete"
                           onClick={() => deleteEntryModal(entry._id)}
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
            adminData={adminData}
            setAdminData={setAdminData}
         />
         <DeleteModal
            endpoint={endpoint}
            entryId={entryId}
            isOpen={deleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            adminData={adminData}
            setAdminData={setAdminData}
         />
      </>
   );
};

export default AdminContent;
