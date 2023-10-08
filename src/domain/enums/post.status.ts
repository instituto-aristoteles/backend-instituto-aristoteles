export const PostStatusValues = ['published', 'draft'] as const;

export type PostStatus = (typeof PostStatusValues)[number];
