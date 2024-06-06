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

// user
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

// song
export type SongData = {
  id: number;
  title: string;
  songPath: string;
  imagePath: string;
  likeCount: number;
  author: AuthorData;
  categories: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type SongShortData = {
  id: number;
  title: string;
  songPath: string;
  imagePath: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SongLike = {
  userId: number;
  songId: number;
};

export type CheckSongLike = {
  isLiked: boolean;
};

// author
export type AuthorData = {
  id: number;
  authorName: string;
  image?: string;
  banner?: string;
  songs: SongData[];
  createdAt?: string;
  updatedAt?: string;
};

// category

export type CategoryData = {
  id: number;
  categoryName: string;
  image?: string;
  banner?: string;
  songs: SongData[];
  createdAt?: string;
  updatedAt?: string;
};

// playlist

export type PlaylistData = {
  id: number;
  playlistName: string;
  image?: string;
  banner?: string;
  songs: SongData[];
  createdAt?: string;
  updatedAt?: string;
};
