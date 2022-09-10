import React from "react";
import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Fraction = styled.div`
  display: block;
  width: 64px;
  height: 64px;
  border: 8px solid #27569c;
  border-color: #27569c transparent transparent transparent;
  border-radius: 50%;
  margin: 8px;
  position: absolute;
  animation: ${rotateAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
`;

const LoaderWrapper = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: calc(50% - 40px);
  left: calc(50% - 40px);

  & ${Fraction}:nth-child(1) {
    animation-delay: -0.45s;
  }
  & ${Fraction}:nth-child(2) {
    animation-delay: -0.3s;
  }
  & ${Fraction}:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <Fraction></Fraction>
      <Fraction></Fraction>
      <Fraction></Fraction>
      <Fraction></Fraction>
    </LoaderWrapper>
  );
};

export default Loader;
