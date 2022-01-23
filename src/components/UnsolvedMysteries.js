import React from "react";

const UnsolvedMysteries = ({ data }) => {
   return (
      <section className="content">
         <h2 className="page-heading">Unsolved Mysteries</h2>
         <div className="grid-container text-center">
            {data.map((mystery) => (
               <div key={mystery.id} className="grid-column">
                  <div className="content-item">
                     <h2 className="content-item__title">{mystery.title}</h2>
                     <img
                        className="content-item__image"
                        src={mystery.thumbnail}
                     />
                     <div className="content-item__source text-content hide">
                        <h2 className="content-item__heading text-center">
                           {mystery.title}
                        </h2>
                        <div className="story-images">
                           <img
                              className="text-content__image_1 center"
                              src=""
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
                              <p>{mystery.story}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
};

export default UnsolvedMysteries;
