import React, { useState } from "react";
import Modal from "react-modal";
import {
   postImageToBucket,
   removeImageFromBucket,
} from "../utils/awsImageHelpers";

const customStyles = {
   content: {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      border: "none",
      background: "#000",
      maxWidth: "550px",
      height: "500px",
      margin: "auto",
   },
   overlay: {
      background: "rgb(62 62 62 / 75%)",
      zIndex: 1000,
   },
};

const EntryModal = ({
   endpoint,
   entry,
   setEntry,
   isOpen,
   setEntryModalOpen,
   isNewEntry,
   adminData,
   setAdminData,
}) => {
   const [thumbnail, setThumbnail] = useState("");
   const [thumbnailTitle, setThumbnailTitle] = useState("");
   const [message, setMessage] = useState("");
   const { title, content } = entry;
   const imageFormData = new FormData();

   const closeModal = () => {
      setEntryModalOpen(false);
   };

   const addEntry = async () => {
      imageFormData.append("thumbnail", thumbnail);

      const newEntry = {
         _id: "",
         title,
         thumbnail: thumbnailTitle,
         content,
      };

      setAdminData([...adminData, newEntry]);

      try {
         const response = await fetch(`/api/${endpoint}`, {
            method: "POST",
            body: JSON.stringify(newEntry),
            headers: { "Content-Type": "application/json" },
         });

         if (response.status === 200) {
            setMessage("Uploaded");
            setThumbnail("");
            setThumbnailTitle("");
         } else {
            console.log("400 bad request");
         }
      } catch (error) {
         console.error(error);
      }

      postImageToBucket(imageFormData);
   };

   const updateEntry = async () => {
      imageFormData.append("thumbnail", thumbnail);

      const updatedEntry = {
         _id: entry._id,
         title,
         thumbnail: thumbnailTitle,
         content,
      };

      //adminData.filter(entryItem => entryItem._id === entry._id)
      //setAdminData([...adminData, updatedEntry]);

      removeImageFromBucket(entry.thumbnail);

      fetch(`/api/${endpoint}/${entry._id}`, {
         method: "PUT",
         body: JSON.stringify(updatedEntry),
         headers: { "Content-Type": "application/json" },
      })
         .then(() => {
            setMessage("Updated");
            setThumbnail("");
            setThumbnailTitle("");
         })
         .catch((error) => console.error(error));

      postImageToBucket(imageFormData);
   };

   const submitEntry = (e) => {
      e.preventDefault();

      if (isNewEntry) {
         addEntry();
      } else {
         updateEntry();
      }
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
         <form className="admin-form" onSubmit={submitEntry}>
            <label htmlFor="">Title:</label>
            <input
               className="admin-form__field"
               type="text"
               name="title"
               value={title || ""}
               onChange={(e) => onChange(e)}
               placeholder="Enter title"
            />
            <input
               type="file"
               name="thumbnail"
               id="file-upload"
               onChange={(e) => {
                  onChange(e);
                  setThumbnail(e.target.files[0]);
                  setThumbnailTitle(e.target.files[0].name);
               }}
            />
            <label htmlFor="file-upload" className="admin-form__upload">
               Choose File
            </label>
            {thumbnailTitle && <label htmlFor="">{thumbnailTitle}</label>}
            <label htmlFor="">
               {endpoint === "videos" ? "Video ID" : "Story"}:
            </label>
            {endpoint === "videos" ? (
               <input
                  className="admin-form__field"
                  type="text"
                  name="content"
                  value={content || ""}
                  onChange={(e) => onChange(e)}
                  placeholder="Enter ID"
               />
            ) : (
               <textarea
                  className="admin-form__textarea"
                  rows="10"
                  name="content"
                  value={content || ""}
                  onChange={(e) => onChange(e)}
                  placeholder="Start writing a story..."
               />
            )}

            <button className="admin-form__submit">Submit</button>
         </form>
         <div className="admin-message">{message}</div>
      </Modal>
   );
};

export default EntryModal;
