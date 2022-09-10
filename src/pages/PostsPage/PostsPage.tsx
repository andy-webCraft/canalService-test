import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { appSelect } from "../../redux/slices/app.slice";
import PostsList from "../../components/PostsList/PostsList";

const PostsPage = () => {
  const { isLogin } = useAppSelector(appSelect);

  if (!isLogin) return <Navigate to="/login" />;

  return <PostsList />;
};

export default PostsPage;
