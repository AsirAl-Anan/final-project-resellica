// cloudinary.js
import { v2 as cloudinary } from 'cloudinary';


async function uploadToCloudinary(filePath, resourceType = 'auto') {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: resourceType,
            folder: 'videos',
            eager: [
                { streaming_profile: "hd", format: "m3u8" }
            ],
            eager_async: true
        });
        
        
        return {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            eager: uploadResult.eager
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}

export default uploadToCloudinary;