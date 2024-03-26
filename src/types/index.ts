export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
};

export type UploadResponse = {
  originalname: string;
  filename: string;
};

export type SongData = {
  id: number;
  title: string;
  songPath: string;
  imagePath: string;
  author: string;
  createdAt?: string;
};
