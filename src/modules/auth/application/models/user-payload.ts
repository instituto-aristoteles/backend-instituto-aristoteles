export interface UserPayload {
  sub: string;
  username: string;
  name: string;
  iat?: number;
  exp?: number;
}
