import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IAddon } from '../interfaces/add-on.interface';

export class CreateTransactionDto {
  @IsArray()
  @IsNotEmpty()
  supplierIds: number[];

  @IsNumber()
  @IsNotEmpty()
  departure_post_code: number;

  @IsNumber()
  @IsNotEmpty()
  arrival_post_code: number;

  @IsString()
  @IsOptional()
  departure_state_name: string;

  @IsString()
  @IsOptional()
  departure_country_code: string;

  @IsString()
  @IsOptional()
  arrival_state_name: string;

  @IsString()
  @IsOptional()
  arrival_country_code: string;

  @IsNumber()
  @IsOptional()
  item_length: number;

  @IsNumber()
  @IsOptional()
  item_width: number;

  @IsNumber()
  @IsOptional()
  item_height: number;

  @IsNumber()
  @IsNotEmpty()
  item_weight: number;

  @IsOptional()
  addons: IAddon;
}
