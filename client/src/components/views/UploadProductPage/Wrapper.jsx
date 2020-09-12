import React from "react";
import styled from "styled-components";

const WrapperBlock = styled.div`
  min-width: 700px;
  margin: 2rem auto;
`;

function Wrapper({ children }) {
  return <WrapperBlock>{children}</WrapperBlock>;
}

export default Wrapper;
