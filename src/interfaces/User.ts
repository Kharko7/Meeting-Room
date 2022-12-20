export interface Login {
  email: string;
  password: string;
}

export enum Role {
  'user',
  'admin'
}


export interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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