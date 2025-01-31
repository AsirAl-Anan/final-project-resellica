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
            tags,
            page = 1,
            limit = 10
        } = req.body;

        // Build match stages for aggregation
        const matchStages = {};

        // Add category filter if valid
        if (category !== 'all' && mongoose.Types.ObjectId.isValid(category)) {
            matchStages.category = new mongoose.Types.ObjectId(category);
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

        // Add tags filter
        if (tags && tags.length > 0) {
            matchStages.tags = { $in: tags };
        }

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
                    from: 'sellers', // Collection name for sellers
                    localField: 'sellerId',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
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

        // Add country filter if provided
        if (country) {
            pipeline.push({
                $match: {
                    'seller.country': country
                }
            });
        }

        // Add sorting stage
        pipeline.push({ $sort: sortStage });

        // Add pagination stages
        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        );

        // Add project stage to shape the output
        pipeline.push({
            $project: {
                _id: 1,
                originalPrice: 1,
                resalePrice: 1,
                images: 1,
                yearsOfUse: 1,
                status: 1,
                tags: 1,
                createdAt: 1,
                seller: {
                    _id: '$seller._id',
                    name: '$seller.name',
                    email: '$seller.email',
                    country: '$seller.country'
                },
                category: {
                    _id: '$categoryInfo._id',
                    name: '$categoryInfo.name'
                }
            }
        });

        // Execute the aggregation pipeline
        const products = await productModel.aggregate(pipeline);

        // Get total count with the same filters
        const countPipeline = [
            { $match: matchStages },
            { $lookup: {
                from: 'sellers',
                localField: 'sellerId',
                foreignField: '_id',
                as: 'seller'
            }},
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

        res.json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total,
            products
        });

    } catch (error) {
        next(error);
    }
});


export default userRouter;
