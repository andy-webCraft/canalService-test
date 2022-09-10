import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { appSelect, authCheckThunk } from "../../redux/slices/app.slice";
import {
  borderedBoxStyle,
  breakPoints,
  secondTitleStyle,
} from "../../styles/styles";

const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const FormTitle = styled.h2`
  color: #27569c;
  margin-bottom: 45px;
`;

const InputStyled = styled.input`
  max-width: 295px;
  background: #d9d9d9;
  border: 4px solid #27569c;
  border-radius: 10px;
  padding: 5px 10px;
`;

const ButtonStyled = styled.button`
  min-width: 213px;
  font-weight: inherit;
  background: #e4b062;
  border-radius: 10px;
  padding: 5px 10px;
  transition: all 0.2s ease-in-out;
  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const ErrorStyled = styled.p`
  color: rgba(255, 0, 0, 0.6);
  margin-bottom: 25px;
`;

const FormStyled = styled.form`
  max-width: 480px;
  width: 100%;
  ${borderedBoxStyle}
  ${secondTitleStyle}
  text-align: center;
  padding: 41px 15px 22px;
  margin: auto;
  @media (max-width: ${breakPoints.sm}) {
    padding: 11px 38px 27px 30px;
    margin: 14px auto auto;
    & ${FormTitle} {
      margin-bottom: 13px;
    }
    & ${FieldWrapper} {
      max-width: 220px;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 auto 18px;
    }
    & ${InputStyled} {
      width: 100%;
      &[type="text"] {
        padding: 1.5px 10px;
        margin-top: 18px;
      }
      &[type="password"] {
        font-size: 22px;
        padding: 0px 10px;
        margin-top: 11px;
      }
    }
    & ${ButtonStyled} {
      margin-top: 4px;
    }
  }
`;

const Form = () => {
  let [login, setLogin] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [error, setError] = useState<string | null>(null);

  const { isRequesting } = useAppSelector(appSelect);
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    dispatch(authCheckThunk({ login, password }))
      .unwrap()
      .catch((error) => setError(error));
  };

  return (
    <FormStyled onSubmit={submitHandler}>
      <FormTitle>Autorization</FormTitle>

      <FieldWrapper>
        <label htmlFor="formLogin">login</label>
        <InputStyled
          id="formLogin"
          name="login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <label htmlFor="formPassword">password</label>
        <InputStyled
          id="formPassword"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FieldWrapper>

      {error && <ErrorStyled>{error}</ErrorStyled>}

      <ButtonStyled disabled={isRequesting}>Submit</ButtonStyled>
    </FormStyled>
  );
};

export default Form;
