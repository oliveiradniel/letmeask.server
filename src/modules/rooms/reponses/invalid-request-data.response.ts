import { ApiProperty } from '@nestjs/swagger';

export class InvalidRequestDataResponse {
  @ApiProperty({
    example: ['name should not be empty', 'name must be a string'],
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
