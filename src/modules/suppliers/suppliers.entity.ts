import { SupplierStatus } from '../../utils/constant';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Unique(['code'])
  @Column({ length: 500 })
  code: string;

  @Column({ length: 500 })
  url: string;

  @Column({ length: 500, nullable: true })
  username: string;

  @Column({ length: 500, nullable: true })
  password: string;

  @Column({ length: 500, nullable: true })
  apiKey: string;

  @Column({ default: SupplierStatus.ACTIVE })
  status: boolean;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updatedAt: string;
}
