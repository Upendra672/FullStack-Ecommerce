const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const CatchErrorHandler = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");


//Create Product- Admin
exports.createProduct = CatchErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get all product
exports.getAllProducts = CatchErrorHandler(async (req, res, next) => {

  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apifeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount
  });
});

//Get single product details
exports.getProductDetails = CatchErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not found",404))
  }

  // if (!product) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Product not found",
  //   });
  // }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update Products - Admin
exports.updateProduct = CatchErrorHandler(async (req, res,next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not found",404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product
exports.deleteProduct = CatchErrorHandler(async (req, res,next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not found",404))
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});





//simple get all products without search and filter function
//Get all product
// exports.getAllProducts = CatchErrorHandler(async (req, res, next) => {
//   const products = await Product.find();
//   res.status(200).json({
//     success: true,
//     products,
//   });
// });