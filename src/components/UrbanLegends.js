import React, { useState } from "react";
import Modal from "react-modal";
//import ContentModal from "./ContentModal";

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

const UrbanLegends = ({ data }) => {
   const [modalState, setModalState] = useState(false);

   const openModal = () => {
      setModalState(true);
   };

   const closeModal = () => {
      setModalState(false);
   };

   return (
      <section className="content">
         <h2 className="page-heading">Urban Legends</h2>
         <div className="grid-container text-center">
            {data.map((legend) => (
               <button
                  key={legend.id}
                  className="grid-column"
                  onClick={openModal}
               >
                  <div className="content-item">
                     <h2 className="content-item__title">{legend.title}</h2>
                     <img
                        className="content-item__image"
                        src={legend.thumbnail}
                     />

                     {/* modal data moved from here */}
                     <Modal
                        isOpen={modalState}
                        onRequestClose={closeModal}
                        style={customStyles}
                     >
                        <button onClick={closeModal}>close</button>
                        <div className="content-item__source text-content">
                           <h2 className="content-item__heading text-center">
                              {legend.title}
                           </h2>

                           <div className="story-images">
                              <img
                                 className="text-content__image_1 center"
                                 src={legend.thumbnail}
                              />
                           </div>
                           <div className="content-item__controls">
                              <input
                                 className="button"
                                 type="button"
                                 value="Play"
                              />
                              <input
                                 className="button"
                                 type="button"
                                 value="Stop"
                              />
                           </div>
                           <div className="text-content__story">
                              <div>
                                 <p>{legend.story}</p>
                              </div>
                           </div>
                        </div>
                     </Modal>
                  </div>
               </button>
            ))}
         </div>
      </section>
   );
};

export default UrbanLegends;
