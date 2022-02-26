import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import YouTubeEmbed from "./YoutubeEmbed";

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

const WeirdVideos = () => {
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modalContent, setModalContent] = useState({});
   const [data, setData] = useState([]);

   const openModal = (video) => {
      setModalIsOpen(true);
      setModalContent(video);
   };

   const closeModal = () => {
      setModalIsOpen(false);
   };

   useEffect(() => {
      fetch("http://localhost:5000/videos")
         .then((response) => response.json())
         .then((result) => setData(result.data));
   }, []);

   return (
      <section className="content">
         <h2 className="page-heading">Weird Videos</h2>
         <div className="grid-container text-center">
            {data.map((video) => (
               <button
                  key={video._id}
                  className="grid-column"
                  onClick={() => openModal(video)}
               >
                  <div className="content-item video-content">
                     <h2 className="content-item__title">{video.title}</h2>
                     <img
                        className="content-item__image"
                        src={video.thumbnail}
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
            <button onClick={closeModal}>close</button>

            <YouTubeEmbed videoId={modalContent.urlId} />
         </Modal>
      </section>
   );
};

export default WeirdVideos;
