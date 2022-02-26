import React from "react";

const YouTubeEmbed = ({ videoId }) => (
   <div className="iframe-content">
      <iframe
         src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
         frameBorder="0"
         allow="autoplay"
         allowFullScreen
      ></iframe>
   </div>
);

export default YouTubeEmbed;
