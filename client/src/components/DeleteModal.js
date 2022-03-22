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
      height: "100px",
      margin: "auto",
      textAlign: "center",
   },
   overlay: {
      background: "rgb(62 62 62 / 75%)",
      zIndex: 1000,
   },
};

const DeleteModal = ({
   endpoint,
   entryId,
   isOpen,
   setDeleteModalOpen,
   adminData,
   setAdminData,
}) => {
   const deleteEntry = () => {
      setAdminData(adminData.filter((entry) => entry._id !== entryId));

      fetch(`/api/${endpoint}/${entryId}`, {
         method: "DELETE",
      });

      closeModal();
   };

   const closeModal = () => {
      setDeleteModalOpen(false);
   };

   return (
      <Modal
         isOpen={isOpen}
         closeTimeoutMS={500}
         onRequestClose={closeModal}
         style={customStyles}
      >
         <p className="admin__delete-message">
            Are you sure you want to delete this entry?
         </p>
         <div className="admin__delete-options">
            <button
               className="admin__button admin__button--update"
               onClick={closeModal}
            >
               Cancel
            </button>
            <button
               className="admin__button admin__button--delete"
               onClick={() => {
                  deleteEntry();
               }}
            >
               Delete
            </button>
         </div>
      </Modal>
   );
};

export default DeleteModal;
