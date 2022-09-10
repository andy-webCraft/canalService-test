import axios from "axios";
import { UserResponse, PostResponse, PhotoResponse } from "../types";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const dataApi = {
  getUsers() {
    return instance.get<Array<UserResponse>>("/users");
  },
  getUserPost(userId: number) {
    return instance.get<Array<PostResponse>>(`/users/${userId}/posts?_limit=1`);
  },
  getUserPhoto(userId: number) {
    return instance.get<Array<PhotoResponse>>(
      `albums/${userId}/photos?_limit=1`
    );
  },
};
