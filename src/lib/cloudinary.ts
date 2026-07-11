import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/** Upload a base64 or remote image URL to Cloudinary, into the AuraArts24 folder. */
export async function uploadImage(
  source: string,
  folder: "products" | "commissions" | "avatars" = "products"
) {
  const result = await cloudinary.uploader.upload(source, {
    folder: `auraarts24/${folder}`,
    resource_type: "image",
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });
  return { url: result.secure_url, publicId: result.public_id };
}

/** Delete an image from Cloudinary by its public ID. */
export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

/** Build a responsive, auto-optimized Cloudinary URL with the given width. */
export function cldUrl(publicIdOrUrl: string, width = 800) {
  if (publicIdOrUrl.startsWith("http")) return publicIdOrUrl;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${width}/${publicIdOrUrl}`;
}

export default cloudinary;
