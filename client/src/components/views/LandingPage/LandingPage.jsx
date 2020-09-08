import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const LandingPage = ({ history }) => {
  const onClickLogoutBtn = async () => {
    const res = await axios.get('/api/users/logout');

    if (res.data.success) {
      history.push('/login');
    } else {
      alert('로그아웃 하는데 실패');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <h2>시작 페이지</h2>
      <button onClick={onClickLogoutBtn}>로그아웃</button>
    </div>
  );
};

export default withRouter(LandingPage);
