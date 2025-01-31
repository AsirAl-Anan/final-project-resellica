// controllers/AdminControllers/getDashboardStatsController.js
import userModel from "../../models/userModel.js";
import adm
import sellerModel from "../../models/sellerModel.js";
import productModel from "../../models/productModel.js";
import categoryModel from "../../models/categoryModel.js";
import transactionModel from "../../models/transactionModel.js";

const getDashboardStats = async (req, res) => {
    try {
        // Get counts for all collections
        const [
            userCount,
            adminCount,
            sellerCount,
            productCount,
            categoryCount,
            transactionCount
        ] = await Promise.all([
            userModel.countDocuments(),
            adminModel.countDocuments(),
            sellerModel.countDocuments(),
            productModel.countDocuments(),
            categoryModel.countDocuments(),
            transactionModel.countDocuments()
        ]);

        // Get recent users with their roles
        const recentUsers = await userModel.aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            {
                $project: {
                    username: 1,
                    email: 1,
                    role: 1,
                    points: 1,
                    createdAt: 1
                }
            }
        ]);

        // Get seller statistics
        const sellerStats = await sellerModel.aggregate([
            {
                $group: {
                    _id: "$isVerified",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get product statistics with category information
        const productStats = await productModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                $group: {
                    _id: "$categoryInfo.name",
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: "$resalePrice" }
                }
            }
        ]);

        // Get transaction statistics
        const transactionStats = await transactionModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    totalValue: { $sum: "$totalCost" }
                }
            }
        ]);

        // Return combined statistics
        return res.status(200).json({
            success: true,
            data: {
                counts: {
                    users: userCount,
                    admins: adminCount,
                    sellers: sellerCount,
                    products: productCount,
                    categories: categoryCount,
                    transactions: transactionCount
                },
                recentUsers,
                sellerStats,
                productStats,
                transactionStats,
                summary: {
                    totalMoneyFlow: await transactionModel.aggregate([
                        {
                            $group: {
                                _id: null,
                                total: { $sum: "$totalCost" }
                            }
                        }
                    ]).then(result => result[0]?.total || 0),
                    verifiedSellers: sellerStats.find(stat => stat._id === true)?.count || 0,
                    pendingSellers: sellerStats.find(stat => stat._id === false)?.count || 0
                }
            }
        });

    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching dashboard statistics",
            error: error.message
        });
    }
};

export default getDashboardStats;