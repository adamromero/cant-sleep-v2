import React from "react";

const WeirdVideos = ({ data }) => {
   return (
      <section className="content">
         <h2 className="page-heading">Weird Videos</h2>
         <div className="grid-container text-center">
            {data.map((video) => (
               <div key={video.id} className="grid-column">
                  <div className="content-item video-content">
                     <h2 className="content-item__title">{video.title}</h2>
                     <img
                        className="content-item__image"
                        src={video.thumbnail}
                     />
                     <div
                        className="content-item__video"
                        data-video={video.urlId}
                     ></div>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
};

export default WeirdVideos;
