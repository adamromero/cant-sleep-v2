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
}) => {
   const [thumbnail, setThumbnail] = useState("");
   const [thumbnailTitle, setThumbnailTitle] = useState("");
   const [message, setMessage] = useState("");

   const { title, content } = entry;

   const closeModal = () => {
      setEntryModalOpen(false);
   };

   const addEntry = async () => {
      const imageFormData = new FormData();
      imageFormData.append("thumbnail", thumbnail);

      try {
         const response = await fetch(`/api/${endpoint}`, {
            method: "POST",
            body: JSON.stringify({
               title,
               thumbnail: thumbnailTitle,
               content,
            }),
            headers: { "Content-Type": "application/json" },
         });

         if (response.status === 200) {
            setThumbnail("");
            setThumbnailTitle("");
            console.log("successful upload");
            window.location.reload();
         } else {
            console.log("400 bad request");
         }
      } catch (error) {
         console.error(error);
      }

      try {
         const response = await fetch(`/api/aws-upload`, {
            method: "POST",
            body: imageFormData,
         });
      } catch (error) {
         console.error(error);
      }
   };

   const updateEntry = async () => {
      fetch(`/api/${endpoint}/${entry._id}`, {
         method: "PUT",
         body: JSON.stringify({
            title,
            content,
         }),
         headers: { "Content-Type": "application/json" },
      })
         .then(() => {
            setMessage("Updated");
            setThumbnail("");
            setThumbnailTitle("");
            window.location.reload();
         })
         .catch((error) => console.error(error));
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
