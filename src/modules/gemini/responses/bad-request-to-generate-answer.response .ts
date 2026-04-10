import { ApiProperty } from '@nestjs/swagger';

export class BadRequestToGenerateAnswerResponse {
  @ApiProperty({
    example: 'Failed to generate a response from Gemini.',
  })
  message!: string[];

  @ApiProperty({
    example: 'Bad Request',
    description: 'Short description of the error type.',
  })
  error!: string;

  @ApiProperty({
    example: 400,
    description: 'HTTP status code.',
  })
  statusCode!: number;
}
