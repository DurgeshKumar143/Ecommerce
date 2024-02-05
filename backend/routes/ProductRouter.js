const express=require("express");
 
 
const { getAllProducts ,createProduct,UpdataProduct,getProductDetail,deletProduct, createProductReview, getProductReviews, deleteReview} = require("../controllers/ProductController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router=express.Router();


router.route('/products').get(getAllProducts);

// router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route('/admin/product/new').post(createProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),UpdataProduct)
router.route('/product/:id').get(getProductDetail)

router.route('admin/product/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deletProduct)

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)





module.exports=router;