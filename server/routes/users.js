const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//              Auth
//=================================

router.post("/signup", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err)
      return res.status(400).json({
        status: "error",
        data: {},
        message: "가입에 실패했습니다.",
        error: "user-0004",
      });

    return res.status(200).json({
      status: "ok",
      data: {
        success: true,
      },
      message: "가입에 성공하였습니다",
      error: "",
    });
  });
});

router.post("/signin", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        data: {},
        message: "서버에 문제가 발생했습니다",
        error: "server-0001",
      });
    }

    if (!user) {
      return res.json({
        status: "error",
        data: {},
        message: "이메일에 해당하는 유저가 없습니다",
        error: "user-0001",
      });
    }

    // 이메일이 데이터 베이스에 있다면 비밀번호를 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          status: "error",
          data: {},
          message: "비밀번호가 틀렸습니다",
          error: "user-0002",
        });
      }
      // 비밀번호까지 맞다면 Token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다.

        const responseObj = {
          status: "ok",
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.role,
            cart: user.cart,
            history: user.history,
            accessToken: user.token,
          },
          message: "로그인하셨습니다",
          error: "",
        };

        res.status(200).json(responseObj);
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  // 미들웨어를 통과했다면 Authentication 이 True 라는 뜻.

  res.status(200).json({
    status: "ok",
    data: {
      user: req.user,
      isAuth: true,
    },
  });
});

router.post("/addToCart", auth, async (req, res) => {
  try {
    // 먼저 User Collection 에 해당 유저 정보 가져오기
    const userInfo = await User.findOne({ _id: req.user._id });

    // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어있는지 확인
    let duplicate = false;

    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      // 상품이 이미 있을 때
      const updatedUserInfo = await User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }
      );

      return res.status(200).json({
        status: "ok",
        data: updatedUserInfo.cart,
        message: "카트에 추가하는 데 성공했습니다",
        error: "",
      });
    } else {
      // 상품이 없을 때
      const updatedUserInfo = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true }
      );

      return res.status(200).json({
        status: "ok",
        data: updatedUserInfo.cart,
        message: "카트에 추가하는 데 성공했습니다",
        error: "",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      data: error,
      message: "카트에 추가하는 데 실패했습니다",
      error: "user-0005",
    });
  }
});

router.get("/signout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user.id }, { token: "" }, (err, user) => {
    if (err)
      return res.json({
        status: "error",
        data: {},
        message: "로그아웃 중 문제가 발생했습니다.",
        error: "user-0003",
      });
    return res.status(200).send({
      status: "ok",
      data: {},
      message: "로그아웃하셨습니다",
      error: "",
    });
  });
});

module.exports = router;
