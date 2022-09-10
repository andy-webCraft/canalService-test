import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getUsersData, usersSelector } from "../../redux/slices/users.slice";
import UserPost from "../UserPost/UserPost";
import styled from "styled-components";
import { breakPoints, secondTitleStyle } from "../../styles/styles";
import { appSelect } from "../../redux/slices/app.slice";
import Loader from "../Loader/Loader";

const ErrorStyled = styled.p`
  ${secondTitleStyle}
  color: rgba(255, 0, 0, 0.6);
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
`;

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 20px 13px;
  padding: 20px 37px;
  margin: auto;

  @media (max-width: ${breakPoints.md}) {
    grid-gap: 25px 20px;
    padding: 25px 37px;
  }
  @media (max-width: ${breakPoints.sm}) {
    grid-template-columns: 1fr;
    grid-gap: 10px 0;
    padding: 10px 0px;
  }
`;

const PostsList = () => {
  let [error, setError] = useState<string | null>(null);

  const { users } = useAppSelector(usersSelector);
  const { isRequesting } = useAppSelector(appSelect);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(null);

    dispatch(getUsersData())
      .unwrap()
      .catch((error) => setError(error));
  }, []);

  return (
    <PostListWrapper>
      {error && <ErrorStyled>&#128542; {error}</ErrorStyled>}

      {isRequesting ? (
        <Loader />
      ) : (
        users.map((user) => {
          return (
            <UserPost
              key={user.id}
              id={user.id}
              name={user.name}
              company={user.company}
              photo={user.photo}
              post={user.post}
            />
          );
        })
      )}
    </PostListWrapper>
  );
};

export default PostsList;
