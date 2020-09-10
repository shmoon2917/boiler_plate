const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.headers["x-access-token"];

  // 토큰을 복호화한 후, 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        status: "error",
        data: {},
        message: "",
        error: "인증 실패",
      });

    req.token = token;
    req.user = user;
    next();
  });
  // 유저가 있으면 인증 Okay
};

module.exports = { auth };
