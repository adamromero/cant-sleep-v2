import React from "react";

const YouTubeEmbed = ({ videoId }) => {
   console.log(videoId);
   return (
      <div className="iframe-content">
         <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
         ></iframe>
      </div>
   );
};

export default YouTubeEmbed;
