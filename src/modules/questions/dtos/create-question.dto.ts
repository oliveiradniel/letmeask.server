import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDTO {
  @IsString()
  @IsNotEmpty()
  question!: string;
}
