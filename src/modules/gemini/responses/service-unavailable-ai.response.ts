import { ApiProperty } from '@nestjs/swagger';

export class ServiceUnavailableAIResponse {
  @ApiProperty({
    example: 'AI service temporarily unavailable. Please try again.',
  })
  message!: string[];

  @ApiProperty({
    example: 'Service Unavailable',
    description: 'Short description of the error type.',
  })
  error!: string;

  @ApiProperty({
    example: 503,
    description: 'HTTP status code.',
  })
  statusCode!: number;
}
