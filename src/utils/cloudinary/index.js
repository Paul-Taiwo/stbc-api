import { v2 } from "cloudinary";
import config from "../../config";

v2.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export default v2;
