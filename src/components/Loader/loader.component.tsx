import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  width: 100%;
  /* max-width: calc(100vh - 40px); */
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {}

const Loader: React.FC<Props> = () => {
  return (
    <LoaderWrapper>
      <div className="lds-dual-ring"></div>
    </LoaderWrapper>
  );
};

export default Loader;
