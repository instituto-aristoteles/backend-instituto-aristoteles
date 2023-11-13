export const UserStatusValues = ['confirmed', 'unconfirmed'] as const;

export type UserStatus = (typeof UserStatusValues)[number];
