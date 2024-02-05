
const catchAsyncError = require("../middleware/catchAsyncError")
const Product = require("../models/ProductModel")

const ApiFeatures = require("../utils/apifeatures")
const ErrorHandler = require("../utils/errorHandler")

exports.createProduct = catchAsyncError(async (req, res, next) => {
    //    req.body.user=req.user.id


    const product = await Product.create(req.body)
    res.status(200).json({
        success: true,
        product
    })

})



// This is to find all product Infomation 
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
     
    

const resuiltPerPage = 3;
    const productsCount = await Product.countDocuments();

     
      const apiFeature=new ApiFeatures(Product.find(),req.query).filter().pagination(resuiltPerPage).Search();
    //   const apiFeature = new ApiFeatures(Product.find(),req.query).Search();
     
     const product=await apiFeature.query;

    
    res.status(200).json({
        success: true,
        product,
        productsCount,
        resuiltPerPage,
    })


})




exports.UpdataProduct = catchAsyncError(async (req, res, next) => {

    //let product=await Product.findById(req.params.id);
    let product = await Product.findByIdAndUpdate(req.params.id, req.body)

    if (!product) {
        return next(new ErrorHandler("Product Not Found ", 404))
    }

    res.status(200).json({
        success: true,
        product
    })



})


exports.getProductDetail = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    const product = await Product.findById({ _id: id });




    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }


    res.status(200).json({
        success: true,
        product
    })
})


exports.deletProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Deleted", 404))
    }

    await product.delete();
    res.status(200).json({
        success: true,
        message: "Your product Delete SuccessFully"
    })
})



// Create New Review or Update review 
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,

    };
    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString());
            (rev.rating = rating), (rev.comment = comment)
        })


    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;

    product.ratings = product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.rating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,

    })
})


// Get all reviews of a product 
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found ", 400))

    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })

})


exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler(" Product Not found ", 400))
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    })

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,

    })


    res.status(200).json({
        success: true,
    })
})