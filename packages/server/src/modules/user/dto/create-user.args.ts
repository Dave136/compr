import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class CreateUserArgs {
  @IsString({ message: 'The type entered for the name field is not valid' })
  @IsNotEmpty({ message: 'The name field cannot be empty' })
  name: string;

  @IsString({ message: 'The type entered for the username field is not valid' })
  @IsNotEmpty({ message: 'The username field cannot be empty' })
  username: string;

  @IsString({ message: 'The type entered for the email field is not valid' })
  @IsNotEmpty({ message: 'The email field cannot be empty' })
  email: string;

  @IsString({ message: 'The type entered for the password field is not valid' })
  @IsNotEmpty({ message: 'The password field cannot be empty' })
  password: string;
}
