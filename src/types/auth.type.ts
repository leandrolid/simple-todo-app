export type Auth<T> = {
  user: AuthUserDto;
} & T;

export type AuthUserDto = {
  id: string;
  email: string;
};
