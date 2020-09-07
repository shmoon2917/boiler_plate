import React, { useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const getHello = async () => {
    const success = await axios.get('/api/hello');
    console.log(success);
  };
  useEffect(() => {
    getHello();
  }, []);

  return <div>Hello world</div>;
};

export default LandingPage;
