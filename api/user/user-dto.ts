import { User } from "./types";

export type PutUserDto = Pick<User, 'email' | 'roles' | 'uid'>
