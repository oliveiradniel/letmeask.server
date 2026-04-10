import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDTO {
  @ApiProperty({
    example: 'O que é React?',
    description: 'Question about the room.',
  })
  @IsString()
  @IsNotEmpty()
  question!: string;
}
