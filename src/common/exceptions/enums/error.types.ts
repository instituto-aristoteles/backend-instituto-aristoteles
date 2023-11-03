export const ErrorTypesValues = [
  'duplicated_key',
  'invalid_token',
  'token_expired',
  'username_or_password_incorrect',
  'user_not_found',
  'database_error',
  'post_not_found',
  'category_not_found',
  'user_not_logged_in',
] as const;

export type ErrorTypes = (typeof ErrorTypesValues)[number];
