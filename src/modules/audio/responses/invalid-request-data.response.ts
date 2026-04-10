import { ApiProperty } from '@nestjs/swagger';

export class InvalidRequestDataResponse {
  @ApiProperty({
    example: ['roomId must be a UUID', 'File is required'],
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
