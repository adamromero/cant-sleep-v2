export const postImageToBucket = (imageFormData) => {
   fetch("/api/aws-upload/", {
      method: "POST",
      body: imageFormData,
   });
};

export const removeImageFromBucket = (image) => {
   fetch("/api/aws-delete/", {
      method: "DELETE",
      body: JSON.stringify({ image }),
      headers: { "Content-Type": "application/json" },
   });
};
