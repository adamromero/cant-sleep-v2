import React, { useState, useEffect } from "react";
import Modal from "react-modal";

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

const UnsolvedMysteries = () => {
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modalContent, setModalContent] = useState({});
   const [data, setData] = useState([]);

   const openModal = (mystery) => {
      setModalIsOpen(true);
      setModalContent(mystery);
   };

   const closeModal = () => {
      setModalIsOpen(false);
   };

   useEffect(() => {
      fetch("http://localhost:5000/mysteries")
         .then((response) => response.json())
         .then((result) => setData(result.data));
   }, []);

   return (
      <section className="content">
         <h2 className="page-heading">Unsolved Mysteries</h2>
         <div className="grid-container text-center">
            {data.map((mystery) => (
               <button
                  key={mystery._id}
                  className="grid-column"
                  onClick={() => openModal(mystery)}
               >
                  <div className="content-item">
                     <h2 className="content-item__title">{mystery.title}</h2>
                     <img
                        className="content-item__image"
                        src={mystery.thumbnail}
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
            <div className="content-item__source text-content">
               <h2 className="content-item__heading text-center">
                  {modalContent.title}
               </h2>
               <div className="story-images">
                  <img
                     className="text-content__image_1 center"
                     src={modalContent.thumbnail}
                  />
               </div>
               <div className="text-content__story">
                  <div>
                     <p>{modalContent.story}</p>
                  </div>
               </div>
            </div>
         </Modal>
      </section>
   );
};

export default UnsolvedMysteries;