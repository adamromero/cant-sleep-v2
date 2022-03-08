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
   setEntryIsOpen,
   isNewEntry,
}) => {
   const [thumbnail, setThumbnail] = useState("");
   const [thumbnailTitle, setThumbnailTitle] = useState("");
   const [message, setMessage] = useState("");

   const { title, story, urlId } = entry;

   const closeModal = () => {
      setEntryIsOpen(false);
   };

   const updateEntry = (e) => {
      e.preventDefault();
      if (isNewEntry) {
         const contentTitle = endpoint === "videos" ? "urlId" : "story";
         const content = endpoint === "videos" ? urlId : story;

         const formData = new FormData();
         formData.append("thumbnail", thumbnail);
         formData.append("title", title);
         formData.append(contentTitle, content);

         try {
            const response = fetch(`http://localhost:5000/${endpoint}`, {
               method: "POST",
               body: formData,
            });

            if (response.status === 200) {
               setTitle("");
               setThumbnail("");
               setThumbnailTitle("");
               setStory("");
               console.log("successful upload");
            } else {
               console.log("400 bad request");
            }
         } catch (error) {
            console.error(error);
         }
      } else {
         fetch(`http://localhost:5000/${endpoint}/${entry._id}`, {
            method: "PUT",
            body: JSON.stringify({
               title,
               story,
            }),
            headers: { "Content-Type": "application/json" },
         })
            .then(() => setMessage("Updated"))
            .catch((error) => console.error(error));
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
         <form className="admin-form" onSubmit={updateEntry}>
            <label htmlFor="">Title:</label>
            <input
               className="admin-form__field"
               type="text"
               name="title"
               value={title}
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
                  name="urlId"
                  value={urlId}
                  onChange={(e) => onChange(e)}
                  placeholder="Enter ID"
               />
            ) : (
               <textarea
                  className="admin-form__textarea"
                  rows="10"
                  name="story"
                  value={story}
                  onChange={(e) => onChange(e)}
               />
            )}

            <button className="admin-form__submit">Submit</button>
         </form>
         <div>{message}</div>
      </Modal>
   );
};

export default EntryModal;
