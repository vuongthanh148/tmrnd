import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Sort } from 'src/utils/constant';

export class ReadProviderDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  sortField?: string;

  @IsString()
  @IsOptional()
  @IsEnum(Sort)
  sortType?: string;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;
}
