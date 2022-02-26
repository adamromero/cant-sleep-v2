const asyncHandler = require("express-async-handler");
const path = require("path");

const Mysteries = require("../models/Mysteries");

const getMysteries = asyncHandler(async (req, res, next) => {
   try {
      const mysteries = await Mysteries.find();

      return res.status(209).json({
         success: true,
         count: mysteries.length,
         data: mysteries,
      });
   } catch (err) {
      return res.status(500).json({
         success: false,
         error: "Server Error",
      });
   }
});

const getMystery = asyncHandler(async (req, res, next) => {
   const mystery = await Mysteries.findById(req.params.id);

   if (!mystery) {
      res.status(400);
      throw new Error("Mystery not found");
   }

   return res.status(209).json({
      success: true,
      count: mystery.length,
      data: mystery,
   });
});

const addMysteries = asyncHandler(async (req, res, next) => {
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

   const mystery = await Mysteries.create({
      title: req.body.title,
      thumbnail: `/uploads/${thumbnail.name}`,
      story: req.body.story,
   });

   res.status(200).json(mystery);
});

const updateMysteries = asyncHandler(async (req, res, next) => {
   const mystery = await Mysteries.findById(req.params.id);

   if (!mystery) {
      res.status(400);
      throw new Error("mystery not found");
   }

   const updatedMystery = await Mysteries.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new: true,
      }
   );

   res.status(200).json(updatedMystery);
});

const deleteMysteries = asyncHandler(async (req, res, next) => {
   const mystery = await Mysteries.findById(req.params.id);

   if (!mystery) {
      res.status(400);
      throw new Error("mystery not found");
   }

   await mystery.remove();

   res.status(200).json({ id: req.params.id });
});

module.exports = {
   getMysteries,
   getMystery,
   addMysteries,
   updateMysteries,
   deleteMysteries,
};
