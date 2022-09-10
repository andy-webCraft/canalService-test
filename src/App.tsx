import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header/Header";
import { useAppDispatch, useIsMobile } from "./hooks/hooks";
import LoginPage from "./pages/LoginPage/LoginPage";
import PostsPage from "./pages/PostsPage/PostsPage";
import { isMobileToggle } from "./redux/slices/app.slice";
import { breakPoints } from "./styles/styles";

const AppWrapper = styled.div`
  overflow-x: hidden;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  padding-top: 118px;
  @media (max-width: ${breakPoints.sm}) {
    padding: 118px 15px 15px;
  }
`;

const App = () => {
  const checkMobileDevice = useIsMobile();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isMobileToggle(checkMobileDevice));
  }, [checkMobileDevice]);

  return (
    <AppWrapper>
      <Header />

      <Container>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </AppWrapper>
  );
};

export default App;
