import { IsNumber, IsString, isNumber } from 'class-validator';

class CreateProductDto {
  @IsString()
  public name!: string;

  @IsNumber()
  public price!: number;

  @IsString()
  public description!: string;

}

export default CreateProductDto;