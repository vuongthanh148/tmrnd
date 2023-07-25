import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IAddon } from '../interfaces/add-on.interface';
import { objectToSnake } from 'src/common/case-convert';

export class CalculateRateDTO {
  constructor(input: object) {
    Object.assign(this, input);
  }
  @IsArray()
  @IsNotEmpty()
  providerIds: number[];

  @IsNumber()
  @IsOptional()
  departurePostCode: number;

  @IsNumber()
  @IsOptional()
  arrivalPostCode: number;

  @IsString()
  @IsOptional()
  departureStateName: string;

  @IsString()
  @IsOptional()
  departureCountryCode: string;

  @IsString()
  @IsOptional()
  arrivalStateName: string;

  @IsString()
  @IsOptional()
  arrivalCountryCode: string;

  @IsNumber()
  @IsOptional()
  itemLength: number;

  @IsNumber()
  @IsOptional()
  itemWidth: number;

  @IsNumber()
  @IsOptional()
  itemHeight: number;

  @IsNumber()
  @IsNotEmpty()
  itemWeight: number;

  @IsOptional()
  addons: IAddon;

  toEntity() {
    return objectToSnake(this);
  }
}
