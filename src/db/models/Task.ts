import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default
} from 'sequelize-typescript';

@Table
export class Task extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.DATE)
  dueDate?: Date;

  @Default('open')
  @Column(DataType.ENUM('open', 'in progress', 'completed', 'blocked'))
  status!: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  createdAt!: Date;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  updatedAt!: Date;
}