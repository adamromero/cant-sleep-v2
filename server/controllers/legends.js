const asyncHandler = require("express-async-handler");
const path = require("path");

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
   if (!req.body.title || !req.body.story || !req.files) {
      res.status(400);
      throw new Error("Please add required fields");
   }

   const thumbnail = req.files.thumbnail;
   const rootFilePath = path.join(__dirname, "../../");

   thumbnail.mv(
      `${rootFilePath}client/public/uploads/${thumbnail.name}`,
      (err) => {
         if (err) {
            res.status(400);
            throw new Error(err);
         }
      }
   );

   const legend = await Legends.create({
      title: req.body.title,
      thumbnail: `/uploads/${thumbnail.name}`,
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
   getLegend,
   addLegends,
   updateLegends,
   deleteLegends,
};
