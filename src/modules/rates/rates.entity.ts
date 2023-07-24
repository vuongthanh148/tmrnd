import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Decimal128,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAddon } from './interfaces/add-on.interface';

@Entity()
export class Rate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: false })
  providerIds: number[];

  @Column()
  departure_post_code: number;

  @Column()
  arrival_post_code: number;

  @Column({ length: 50, nullable: true })
  departure_state_name: string;

  @Column({ length: 50, nullable: true })
  departure_country_code: string;

  @Column({ length: 50, nullable: true })
  arrival_state_name: string;

  @Column({ length: 50, nullable: true })
  arrival_country_code: string;

  @Column()
  item_length: number;

  @Column()
  item_width: number;

  @Column()
  item_height: number;

  @Column()
  item_weight: number;

  @Column('jsonb', { nullable: true })
  addons: IAddon;

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
