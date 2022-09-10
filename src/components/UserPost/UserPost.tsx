import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { appSelect } from "../../redux/slices/app.slice";
import { borderedBoxStyle, breakPoints } from "../../styles/styles";
import { IUser } from "../../types";

const PostTop = styled.div`
  display: flex;
  margin-bottom: 23px;
`;

const UserPhoto = styled.img`
  width: 150px;
  height: 150px;
`;

const UserInfo = styled.div`
  margin-left: 30px;
  & > p:first-child {
    padding-top: 4px;
    margin-bottom: 20px;
  }
`;

const PostBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > p:first-child {
    min-height: 38px;
    margin-bottom: 8px;
  }
  & > p:last-child {
    min-height: 51%;
  }
`;

const PostWrapper = styled.div`
  max-width: 467px;
  min-height: 388px;
  display: flex;
  flex-direction: column;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  ${borderedBoxStyle}
  padding: 20px 16px;

  @media (max-width: ${breakPoints.md}) {
    min-height: 470px;
    padding: 20px 19px 13px;
    & ${PostTop} {
      flex-direction: column;
      margin-bottom: 0px;
    }
    & ${UserInfo} {
      margin-top: 22px;
      margin-left: 0px;
      & > p {
        margin-bottom: 17px;
      }
    }
    & ${PostBody} {
      & > p:first-child {
        margin-bottom: 8px;
      }
    }
  }
  @media (max-width: ${breakPoints.sm}) {
    min-height: 200px;
    padding: 9px 12px;
    & ${UserInfo} {
      margin-top: 0px;
      & > p:first-child {
        margin-bottom: 28px;
      }
      & > p:last-child {
        margin-bottom: 22px;
      }
    }
    & ${PostBody} {
      & > p:first-child {
        margin-bottom: 0px;
      }
    }
  }
`;

const UserPost = ({ name, company, photo, post }: IUser) => {
  const { isMobile } = useSelector(appSelect);

  return (
    <PostWrapper>
      <PostTop>
        {photo && !isMobile && <UserPhoto src={photo} alt="avatar" />}

        <UserInfo>
          <p>Autor: {name}</p>
          <p>Company: {company}</p>
        </UserInfo>
      </PostTop>

      {post && (
        <PostBody>
          <p>Title: {post.title}</p>
          {!isMobile && <p>{post.body}</p>}
        </PostBody>
      )}
    </PostWrapper>
  );
};

export default UserPost;
