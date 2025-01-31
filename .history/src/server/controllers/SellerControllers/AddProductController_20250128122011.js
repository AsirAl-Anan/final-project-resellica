// productController.js
import productModel from '../models/productModel.js';
import uploadToCloudinary from '../utils/cloudinary.js';
import fs from 'fs/promises';

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subCategory,
      originalPrice,
      sellingPrice,
      buyingTime,
      publishStatus
    } = req.body;

    // Upload main image
    let mainImageUrl = '';
    if (req.files.mainImage && req.files.mainImage[0]) {
      const mainImageResult = await uploadToCloudinary(req.files.mainImage[0].path);
      mainImageUrl = mainImageResult.url;
      
      // Clean up local file
      await fs.unlink(req.files.mainImage[0].path);
    }

    // Upload gallery images
    let galleryUrls = [];
    if (req.files.galleryImages) {
      for (const image of req.files.galleryImages) {
        const result = await uploadToCloudinary(image.path);
        galleryUrls.push(result.url);
        
        // Clean up local file
        await fs.unlink(image.path);
      }
    }

    // Combine all image URLs
    const allImages = [mainImageUrl, ...galleryUrls].filter(url => url);

    // Calculate years of use from buying time
    const buyingDate = new Date(buyingTime);
    const currentDate = new Date();
    const yearsOfUse = ((currentDate - buyingDate) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);

    // Create new product
    const product = new productModel({
      sellerId: req.user._id, // Assuming you have user info in request
      category,
      originalPrice: Number(originalPrice),
      resalePrice: Number(sellingPrice),
      condition: 'Good', // You might want to make this dynamic
      images: allImages,
      yearsOfUse,
      status: publishStatus === 'Publish' ? 'available' : 'draft',
      tags: [], // You can add tags handling if needed
      title,
      description,
      subCategory
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: product
    });

  } catch (error) {
    console.error('Error in addProduct:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product',
      error: error.message
    });
  }
};