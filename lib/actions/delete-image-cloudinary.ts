"use server";

import { v2 as cloudinary } from "cloudinary";

// cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const deleteImageCloudinary = async (public_id: string) => {
  try {
    const res = cloudinary.uploader
      .destroy(public_id)
      .then((result: any) => console.log(result));
  } catch (error) {
    console.log(error);
  }
};
