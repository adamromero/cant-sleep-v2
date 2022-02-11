const asyncHandler = require("express-async-handler");

const Legends = require("../models/Legends");

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

const addLegends = asyncHandler(async (req, res, next) => {
   if (!req.body.title || !req.body.story) {
      res.status(400);
      throw new Error("Please add required fields");
   }

   const legend = await Legends.create({
      title: req.body.title,
      story: req.body.story,
   });

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
   addLegends,
   updateLegends,
   deleteLegends,
};
