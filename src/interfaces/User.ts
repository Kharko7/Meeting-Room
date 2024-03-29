export interface Login {
  email: string;
  password: string;
}

export type Role = 'user' | 'admin';

export interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  role: Role,
  iat: number,
  exp: number,
  id: number
}
export interface RegisterInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface ChangePasswordInterface {
  password: string;
  newPassword: string;
  email: string;
}
export interface RecoveryPasswordInterface {
  email: string;
}
export interface InviteUsersInterface {
  email: string;
};

export interface UpdateUser {
  firstName: string;
  lastName: string;
  image: File | null;
};