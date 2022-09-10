export interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PhotoResponse {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IUser {
  id: number;
  name: string;
  company: string;
  photo: string | null;
  post: { title: string; body: string } | null;
}

export interface IPost {
  title: string;
  body: string;
}
