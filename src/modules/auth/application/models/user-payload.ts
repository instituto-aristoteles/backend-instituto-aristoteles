export interface UserPayload {
  sub: string;
  preferred_username: string;
  name: string;
  email: string;
  picture?: string;
  iat?: number;
  exp?: number;
}
