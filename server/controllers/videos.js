const asyncHandler = require("express-async-handler");
const path = require("path");

const Videos = require("../models/Videos");

const getVideos = asyncHandler(async (req, res, next) => {
   try {
      const videos = await Videos.find();

      return res.status(209).json({
         success: true,
         count: videos.length,
         data: videos,
      });
   } catch (err) {
      return res.status(500).json({
         success: false,
         error: "Server Error",
      });
   }
});

const getVideo = asyncHandler(async (req, res, next) => {
   const video = await Videos.findById(req.params.id);

   if (!video) {
      res.status(400);
      throw new Error("video not found");
   }

   return res.status(209).json({
      success: true,
      count: video.length,
      data: video,
   });
});

const addVideos = asyncHandler(async (req, res, next) => {
   if (!req.body.title || !req.body.content || !req.body.thumbnail) {
      res.status(400);
      throw new Error("Please add required fields");
   }

   const video = await Videos.create({
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      content: req.body.content,
   });

   res.status(200).json(video);
});

const updateVideos = asyncHandler(async (req, res, next) => {
   const video = await Videos.findById(req.params.id);

   if (!video) {
      res.status(400);
      throw new Error("video not found");
   }

   const updatedVideo = await Videos.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new: true,
      }
   );

   res.status(200).json(updatedVideo);
});

const deleteVideos = asyncHandler(async (req, res, next) => {
   const video = await Videos.findById(req.params.id);

   if (!video) {
      res.status(400);
      throw new Error("video not found");
   }

   await video.remove();

   res.status(200).json({ id: req.params.id });
});

module.exports = {
   getVideos,
   getVideo,
   addVideos,
   updateVideos,
   deleteVideos,
};
