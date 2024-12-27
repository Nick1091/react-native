export const enum ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  uid: string;
  email: string;
  roles: ROLE[];
  createdAt: string;
  updatedAt: string;
}
