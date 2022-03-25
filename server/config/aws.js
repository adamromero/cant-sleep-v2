const asyncHandler = require("express-async-handler");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3();

aws.config.update({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION,
});

const fileFilter = (req, file, cb) => {
   if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
   ) {
      cb(null, true);
   } else {
      cb(new Error("Invalid file type"), false);
   }
};

const upload = multer({
   fileFilter,
   storage: multerS3({
      //acl: "public-read",
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
         cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
         cb(null, file.originalname);
      },
   }),
});

const deleteImage = asyncHandler(async (req, res, next) => {
   const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.body.image,
   };

   await s3.deleteObject(params, (err, data) => {
      if (err) {
         console.log(err);
         res.status(500).json({
            success: false,
            error: "Server Error",
         });
      } else {
         res.status(200).json({
            success: true,
            data: data,
         });
      }
   });
});

const setImage = asyncHandler(async (req, res, next) => {
   const singleUpload = upload.single("thumbnail");

   singleUpload(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });

      res.status(200).json({ data: req.file.location });
   });
});

module.exports = { setImage, deleteImage };
