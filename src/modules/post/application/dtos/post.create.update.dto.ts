export type PostCreateUpdateDTO = {
  Title: string;
  Description: string;
  PostStatus: number;
  CreatedById: string;
  UpdatedById?: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
};
