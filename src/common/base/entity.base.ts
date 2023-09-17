export class EntityBase {
  id?: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(props: EntityBase) {
    Object.assign(this, { ...props });
  }
}
