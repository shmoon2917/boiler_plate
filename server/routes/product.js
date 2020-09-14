const express = require("express");
const Jimp = require("jimp");
const router = express.Router();
const multer = require("multer");
const { Product } = require("..//models/Product");
//=================================
//            Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var uploadImageAsync = (req, res) => {
  var upload = multer({ storage }).single("file");

  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) reject(err);
      else {
        resolve(req.file);
      }
    });
  });
};

router.post("/image", async (req, res) => {
  // 가져온 이미지 저장
  try {
    const file = await uploadImageAsync(req, res);

    const resimseImage = await Jimp.read(`../../uploads/${file.pathname}`);

    return res.status(200).json({
      status: "ok",
      data: {
        success: true,
        filePath: file.path,
        fileName: file.filename,
      },
      message: "파일 저장에 성공했습니다",
      error: "",
    });
  } catch (err) {
    return res.json({
      status: "error",
      data: err,
      message: "파일 저장에 실패했습니다",
      error: "product-0001",
    });
  }
});

router.post("/", (req, res) => {
  // 받아온 정보 db에 저장
  const product = new Product(req.body);
  product.save((err, productInfo) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        data: {
          err,
        },
        message: "상품 정보 등록에 실패했습니다.",
        error: "product-0002",
      });
    }

    return res.status(200).json({
      status: "ok",
      data: {},
      message: "상품 정보 등록에 성공하였습니다",
      error: "",
    });
  });
});

router.post("/products", async (req, res) => {
  // product collection 에 들어 있는 모든 상품 정보 가져오기
  try {
    const productsInfo = await Product.find().populate("writer").exec();

    return res.status(200).json({
      status: "ok",
      data: productsInfo,
      message: "상품 정보 가져오는 데 성공했습니다",
      error: "",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      data: err,
      message: "상품 정보 가져오는 데 실패했습니다",
      error: "product-0003",
    });
  }
});

module.exports = router;
