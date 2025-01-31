// productController.js
import productModel from '../../models/productModel.js';
import uploadToCloudinary from '../../utils/cloudinary.js';
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
      console.log(subCategory)
 
};