import { IsString } from 'class-validator';

class CreateProductDto {
  @IsString()
  public name!: string;

  @IsString()
  public price!: string;

  @IsString()
  public description!: string;
}

export default CreateProductDto;