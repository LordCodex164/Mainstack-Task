import { IsNotEmpty, IsString } from "class-validator";

class LoginDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export default LoginDto;