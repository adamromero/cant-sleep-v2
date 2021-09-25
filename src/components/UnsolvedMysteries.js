import React from "react";

const UnsolvedMysteries = () => {
   return (
      <section className="content">
         <h2 className="page-heading">Unsolved Mysteries</h2>
         <div className="grid-container text-center">
            <div className="grid-column">
               <div className="content-item">
                  <h2 className="content-item__title">
                     The Kelly-Hopkinsville Encounter
                  </h2>
                  <img className="content-item__image" src="" />
                  <div className="content-item__source text-content hide">
                     <h2 className="content-item__heading text-center">
                        Robert the Doll
                     </h2>
                     <div className="story-images">
                        <img className="text-content__image_1 center" src="" />
                     </div>
                     <div className="content-item__controls">
                        <input className="button" type="button" value="Play" />
                        <input className="button" type="button" value="Stop" />
                     </div>
                     <div className="text-content__story">
                        <div>
                           <p>
                              Robert Eugene Otto – or Gene, as his family called
                              him – was just a young boy in the early 1900s when
                              his family’s maid gave him a strange, straw-filled
                              doll to play with. Gene loved his life-sized doll
                              and brought it along everywhere, even naming it
                              “Robert” after himself. It wasn’t long, however,
                              before people began noticing signs of Robert the
                              Doll’s evil and mischievous nature.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default UnsolvedMysteries;
