import React, { useState } from "react";
import Modal from "react-modal";
import YouTubeEmbed from "../components/YoutubeEmbed";

const customStyles = {
   content: {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      border: "none",
      background: "#000",
   },
   overlay: { zIndex: 1000 },
};

Modal.setAppElement("#app");

const Presentation = ({ data, title, isVideo }) => {
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modalContent, setModalContent] = useState({});

   const openModal = (entry) => {
      setModalIsOpen(true);
      setModalContent(entry);
   };

   const closeModal = () => {
      setModalIsOpen(false);
   };

   return (
      <section className="content">
         <h2 className="page-heading">{title}</h2>
         <div className="grid-container text-center">
            {data.map((entry) => (
               <button
                  key={entry._id}
                  className="grid-column"
                  onClick={() => openModal(entry)}
               >
                  <div className="content-item entry-content">
                     <h2 className="content-item__title">{entry.title}</h2>
                     <img
                        className="content-item__image"
                        src={entry.thumbnail}
                     />
                  </div>
               </button>
            ))}
         </div>
         <Modal
            isOpen={modalIsOpen}
            closeTimeoutMS={500}
            onRequestClose={closeModal}
            style={customStyles}
         >
            <button className="modal-close" onClick={closeModal}>
               Exit
            </button>

            {isVideo ? (
               <YouTubeEmbed videoId={modalContent.urlId} />
            ) : (
               <div className="content-item__source text-content">
                  <h2 className="content-item__heading text-center">
                     {modalContent.title}
                  </h2>
                  <div className="content-item__body">
                     <div className="story-images">
                        <img
                           className="text-content__image_1 center"
                           src={modalContent.thumbnail}
                        />
                     </div>
                     <div className="text-content__story" tabIndex="0">
                        <div>
                           <p>{modalContent.story}</p>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </Modal>
      </section>
   );
};

export default Presentation;
