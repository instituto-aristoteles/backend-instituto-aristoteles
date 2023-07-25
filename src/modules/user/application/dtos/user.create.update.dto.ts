export type UserCreateUpdateDto = {
  Name: string;
  Email: string;
  Password: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
};
