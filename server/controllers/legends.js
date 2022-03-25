const asyncHandler = require("express-async-handler");
const path = require("path");
const Pusher = require("pusher");

const Legends = require("../models/Legends");

const pusher = new Pusher({
   appId: process.env.PUSHER_APP_ID,
   key: process.env.PUSHER_KEY,
   secret: process.env.PUSHER_SECRET,
   cluster: process.env.PUSHER_CLUSTER,
   useTLS: true,
});

const getLegends = asyncHandler(async (req, res, next) => {
   try {
      const legends = await Legends.find();

      return res.status(209).json({
         success: true,
         count: legends.length,
         data: legends,
      });
   } catch (err) {
      return res.status(500).json({
         success: false,
         error: "Server Error",
      });
   }
});

const getLegend = asyncHandler(async (req, res, next) => {
   const legend = await Legends.findById(req.params.id);

   if (!legend) {
      res.status(400);
      throw new Error("legend not found");
   }

   return res.status(209).json({
      success: true,
      count: legend.length,
      data: legend,
   });
});

const addLegends = asyncHandler(async (req, res, next) => {
   if (!req.body.title || !req.body.content || !req.body.thumbnail) {
      res.status(400);
      throw new Error("Please add required fields");
   }

   const legend = await Legends.create({
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      content: req.body.content,
   });

   pusher.trigger("admin", "entry", {
      
   })

   res.status(200).json(legend);
});

const updateLegends = asyncHandler(async (req, res, next) => {
   const legend = await Legends.findById(req.params.id);

   if (!legend) {
      res.status(400);
      throw new Error("Legend not found");
   }

   const updatedLegend = await Legends.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new: true,
      }
   );

   res.status(200).json(updatedLegend);
});

const deleteLegends = asyncHandler(async (req, res, next) => {
   const legend = await Legends.findById(req.params.id);

   if (!legend) {
      res.status(400);
      throw new Error("Legend not found");
   }

   await legend.remove();

   res.status(200).json({ id: req.params.id });
});

module.exports = {
   getLegends,
   getLegend,
   addLegends,
   updateLegends,
   deleteLegends,
};
