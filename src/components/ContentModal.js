import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#app");

const ContentModal = ({ modalState, closeModal, customStyles, data }) => {
   return (
      <Modal
         isOpen={modalState}
         onRequestClose={closeModal}
         style={customStyles}
      >
         <button onClick={closeModal}>close</button>
         <div className="content-item__source text-content">
            <h2 className="content-item__heading text-center">{data.title}</h2>

            <div className="story-images">
               <img className="text-content__image_1 center" src="" />
            </div>
            <div className="content-item__controls">
               <input className="button" type="button" value="Play" />
               <input className="button" type="button" value="Stop" />
            </div>
            <div className="text-content__story">
               <div>
                  <p>{data.story}</p>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default ContentModal;
