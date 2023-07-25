import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAddon } from '../shipping-service/interfaces/add-on.interface';

@Entity()
export class Rate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { nullable: false, array: true, name: 'provider_ids' })
  providerIds: number[];

  @Column('integer', { name: 'departure_post_code' })
  departurePostCode: number;

  @Column('integer', { name: 'arrival_post_code' })
  arrivalPostCode: number;

  @Column('text', { name: 'departure_state_name' })
  departureStateName: string;

  @Column('text', { name: 'departure_country_code' })
  departureCountryCode: string;

  @Column('text', { name: 'arrival_state_name' })
  arrivalStateName: string;

  @Column('text', { name: 'arrival_country_code' })
  arrivalCountryCode: string;

  @Column('int', { name: 'item_length' })
  itemLength: number;

  @Column('int', { name: 'item_width' })
  itemWidth: number;

  @Column('int', { name: 'item_height' })
  itemHeight: number;

  @Column('int', { name: 'item_weight' })
  itemWeight: number;

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
