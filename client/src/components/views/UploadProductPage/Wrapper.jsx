import React from "react";
import styled from "styled-components";

const WrapperBlock = styled.div`
  margin: 2rem auto;
`;
// min-width: 700px;

function Wrapper({ children }) {
  return <WrapperBlock>{children}</WrapperBlock>;
}

export default Wrapper;
