import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  appSelect,
  isLoginToggle,
  setUserName,
} from "../../redux/slices/app.slice";
import styled from "styled-components";
import decktopLogo from "../../assets/img/desktop-logo.png";
import mobileLogo from "../../assets/img/mobile-logo.png";
import logOutIcon from "../../assets/img/logout-btn.svg";
import { breakPoints, secondTitleStyle } from "../../styles/styles";
import { setUsers } from "../../redux/slices/users.slice";

const HeaderStyled = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e4b062;
  padding: 27px 35px 28px 41px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  @media (max-width: ${breakPoints.md}) {
    padding: 27px 35px 28px 37px;
  }
  @media (max-width: ${breakPoints.sm}) {
    padding: 27px 14px 28px 15px;
  }
`;

const AccountData = styled.div`
  display: flex;
  align-items: center;
  ${secondTitleStyle}

  @media (max-width: ${breakPoints.md}) {
    & > h2 {
      display: none;
    }
  }
`;

const LogOutBtn = styled.button`
  margin-left: 34px;
`;

const Header = () => {
  const { userName, isLogin, isMobile } = useAppSelector(appSelect);
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(isLoginToggle(false));
    dispatch(setUserName(null));
    dispatch(setUsers([]));
  };

  return (
    <HeaderStyled>
      <Link to="/">
        <img src={isMobile ? mobileLogo : decktopLogo} alt="logo" />
      </Link>

      {isLogin && (
        <AccountData>
          {!isMobile && <h2>{userName}</h2>}

          <LogOutBtn onClick={logOutHandler}>
            <img src={logOutIcon} alt="logOut" />
          </LogOutBtn>
        </AccountData>
      )}
    </HeaderStyled>
  );
};

export default Header;
