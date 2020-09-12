const express = require("express");
const router = express.Router();
const multer = require("multer");

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

var upload = multer({ storage }).single("file");

router.post("/image", (req, res) => {
  // 가져온 이미지 저장
  upload(req, res, (err) => {
    if (err) {
      return req.json({
        status: "error",
        data: err,
        message: "파일 저장에 실패했습니다",
        error: "product-0001",
      });
    }
    return res.status(200).json({
      status: "ok",
      data: {
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      },
      message: "파일 저장에 성공했습니다",
      error: "",
    });
  });
});

module.exports = router;
