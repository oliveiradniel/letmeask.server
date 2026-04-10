import { ApiProperty } from '@nestjs/swagger';

export class TooManyRequestsForAIServiceResponse {
  @ApiProperty({
    example: 'Too many requests for AI Service. Please try later.',
  })
  message!: string[];

  @ApiProperty({
    example: 'Too Many Requests',
    description: 'Short description of the error type.',
  })
  error!: string;

  @ApiProperty({
    example: 503,
    description: 'HTTP status code.',
  })
  statusCode!: number;
}
