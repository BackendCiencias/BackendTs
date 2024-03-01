import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.API_KEY,
  // api_secret: process.env.API_SECRET
  cloud_name: "dav0c9i9i",
  api_key: "624369463661536",
  api_secret: "atLyjWlONllvlXq-myyXz5W8gaQ"
});

export const uploadImage = async (filePath: string) =>{
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'student-profile-image',
      })
      return { url: result.secure_url,  public_id: result.public_id}
    } catch (error) {
      throw new Error("Cloudinary Error");
    }
}