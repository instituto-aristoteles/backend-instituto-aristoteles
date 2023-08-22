import { UserToken } from './user-token';

export type UserTokenWithRefresh = UserToken & { refreshToken: string };
