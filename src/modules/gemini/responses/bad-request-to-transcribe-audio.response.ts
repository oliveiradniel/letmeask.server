import { ApiProperty } from '@nestjs/swagger';

export class BadRequestToTranscribeAudioResponse {
  @ApiProperty({
    example: 'The text could not be converted.',
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
