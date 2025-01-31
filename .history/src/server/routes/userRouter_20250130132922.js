import { Router } from "express";
import registrationController from "../controllers/UserControllers/registrationController.js";
import verifyUserToken from "../middlewares/verifyUserToken.js";
import loginController from "../controllers/UserControllers/LoginController.js";
import upload from "../middlewares/multer.js";
import logOutController from "../controllers/UserControllers/LogOutController.js";
import userDataFetchController from "../controllers/UserControllers/userDataFetchController.js";
import categoryModel from "../models/categoryModel.js";
import regenerateToken from "../middlewares/regenerateCookies.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";
const userRouter = Router();

userRouter
  .route("/api/v1/register")
  .post(upload.none(), registrationController);
userRouter.route('/api/v1/get-user-data').get(verifyUserToken,userDataFetchController)
// userRouter.route("/api/v1/update").post(
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 },
//   ]),
 
// );
 userRouter
   .route("/api/v1/login")
   .post(upload.none(),loginController ); 
userRouter
  .route("/api/v1/logout")
  .post(upload.none(), verifyUserToken, logOutController);

  userRouter
  .route("/api/v1/get-categories")
  .get(upload.none(),verifyUserToken,async (req,res)=>{
    try {
      const categories = await categoryModel.find();
      res.status(200).json({
        status: "success",
        data: {
          categories,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "fail",
        message: "Internal server error",
      });
    }
  });  
 userRouter
  .route("/api/v1/regenerate-token")
  .post(upload.none(), regenerateToken);

  userRouter.post('/api/v1/get-products/:category', async (req, res, next) => {
    try {
        const { category } = req.params;
        const {
            country,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
            yearsOfUse,
            page = 1,
            limit = 10,
            subCategory
        } = req.body;
        
        // Debug request parameters
        console.log('Request Parameters:', {
            category,
            country,
            minPrice,
            maxPrice,
            sortBy,
            sortOrder,
            yearsOfUse,
            page,
            limit,
            subCategory
        });
    
        // Build match stages for aggregation
        const matchStages = {status: "available"};
        
        // Add category filter if valid
        if (category !== 'all' && mongoose.Types.ObjectId.isValid(category)) {
            matchStages.category = new mongoose.Types.ObjectId(category);
        }
     
        // Add subCategory filter - only if subCategory is provided
        if (subCategory && subCategory.trim()) {
            matchStages.subCategory = subCategory.trim();
        }

        // Add price range filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            matchStages.resalePrice = {};
            if (minPrice !== undefined) matchStages.resalePrice.$gte = minPrice;
            if (maxPrice !== undefined) matchStages.resalePrice.$lte = maxPrice;
        }
       
        // Add years of use filter
        if (yearsOfUse) {
            matchStages.yearsOfUse = yearsOfUse;
        }
 
        console.log('Match Stages:', JSON.stringify(matchStages, null, 2));

        // Debug: Check if there are any products matching initial criteria
        const initialMatch = await productModel.find(matchStages);
        console.log('Products after initial match:', initialMatch.length);

        // Build sort object
        const sortStage = {};
        if (sortBy) {
            sortStage[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sortStage.createdAt = -1; // Default sort by newest
        }

        // Build aggregation pipeline
        const pipeline = [
            {
                $match: matchStages
            },
            {
                $lookup: {
                    from: 'sellers',
                    localField: 'sellerId',
                    foreignField: 'userId',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
            },
            {
                $lookup:{
                    from: "users",
                    localField: "seller.userId",
                    foreignField: "_id",
                    as: "sellerAccount"
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryInfo'
                }
            },
            {
                $unwind: '$categoryInfo'
            }
        ];

        // Debug: Log pipeline stages before country filter
        console.log('Pipeline before country filter:', JSON.stringify(pipeline, null, 2));

        // Add country filter if provided
        if (country) {
            pipeline.push({
                $match: {
                    'seller.country': country
                }
            });
        }

        pipeline.push({ $sort: sortStage });
        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        );

        pipeline.push({
            $project: {
                _id: 1,
                originalPrice: 1,
                resalePrice: 1,
                images: 1,
                status: 1,
                subCategory: 1,
                createdAt: 1,
                seller: {
                    _id: '$seller._id',
                    name: '$seller.name',
                    email: '$seller.email',
                    country: '$seller.country'
                },
                sellerAccount: 1,
                category: {
                    _id: '$categoryInfo._id',
                    name: '$categoryInfo.name',
                    subcategories: '$categoryInfo.subcategories'
                }
            }
        });

        // Debug: Log final pipeline
        console.log('Final Pipeline:', JSON.stringify(pipeline, null, 2));

        // Execute the aggregation pipeline
        const products = await productModel.aggregate(pipeline);
        
        // Debug: Log product count and first product
        console.log('Products count:', products.length);
        if (products.length > 0) {
            console.log('First product:', JSON.stringify(products[0], null, 2));
        }

        // Debug: Check $lookup collections
        const sellerCount = await mongoose.model('sellers').countDocuments();
        const userCount = await mongoose.model('users').countDocuments();
        const categoryCount = await mongoose.model('categories').countDocuments();
        
        console.log('Collection counts:', {
            sellers: sellerCount,
            users: userCount,
            categories: categoryCount
        });

        const countPipeline = [
            { $match: matchStages },
            { 
                $lookup: {
                    from: 'sellers',
                    localField: 'sellerId',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            { $unwind: '$seller' }
        ];

        if (country) {
            countPipeline.push({
                $match: {
                    'seller.country': country
                }
            });
        }

        countPipeline.push({
            $count: 'total'
        });

        const [totalCount] = await productModel.aggregate(countPipeline);
        const total = totalCount?.total || 0;

        // Debug: Log final results
        console.log('Total count:', total);
        
        res.json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total,
            products
        });

    } catch (error) {
        console.error("Error in get-products:", error);
        next(error);
    }
});
userRouter
.route("/api/v1/categories/:id")
.get(upload.none(),async (req,res)=>{
 const categoryId = req.params.id;

 const category = await categoryModel.findById(categoryId);

  if(!category){
    return res.status(404).json({
      status:"fail",
      message:"Category not found"
    })
  }
  res.status(200).json({
    status:"success",
    data:{
      category
    }
  })
});

export default userRouter;
