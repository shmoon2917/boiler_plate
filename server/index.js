const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require('./models/User');

const config = require('./config');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');

const app = express();

mongoose
  .connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World! hey');
});

app.get('/api/hello', (req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.post('/api/auth/signup', (req, res) => {
  // 회원 가입 시 필요한 정보들을 client 에서 가져오면
  // 그 것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      status: 'ok',
      data: {
        success: true,
      },
      message: '가입 성공',
      error: '',
    });
  });
});

app.post('/api/auth/signin', (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾기
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.status(200).json({
        status: 'error',
        data: {},
        message: '',
        error: '이메일에 해당하는 유저가 없습니다',
      });
    }

    // 이메일이 데이터 베이스에 있다면 비밀번호를 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          status: 'error',
          data: {},
          message: '',
          error: '비밀번호가 틀렸습니다',
        });
      }
      // 비밀번호까지 맞다면 Token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다.

        const responseObj = {
          status: 'ok',
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.role,
            accessToken: user.token,
          },
          message: 'API 요청 성공했습니다',
          error: '',
        };

        res.status(200).json(responseObj);
      });
    });
  });
});

app.get('/api/auth', auth, (req, res) => {
  // 미들웨어를 통과했다면 Authentication 이 True 라는 뜻.
  res.status(200).json({
    status: 'ok',
    data: {
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
    },
    message: '인증 성공',
    error: '',
  });
});

app.get('/api/auth/signout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user.id }, { token: '' }, (err, user) => {
    if (err)
      return res.json({
        status: 'error',
        data: {},
        message: '',
        error: err,
      });
    return res.status(200).send({
      status: 'ok',
      data: {},
      message: '로그아웃 성공',
      error: '',
    });
  });
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
