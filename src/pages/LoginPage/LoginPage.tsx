import React from "react";
import { Navigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { useAppSelector } from "../../hooks/hooks";
import { appSelect } from "../../redux/slices/app.slice";

const LoginPage = () => {
  const { isLogin } = useAppSelector(appSelect);

  if (isLogin) return <Navigate to="/" />;

  return <Form />;
};

export default LoginPage;
