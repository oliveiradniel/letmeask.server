import { ApiProperty } from '@nestjs/swagger';

export class ConflictResponse {
  @ApiProperty({
    example: 'This room name already in use.',
  })
  message!: string[];

  @ApiProperty({
    example: 'Conflict',
    description: 'Short description of the error type..',
  })
  error!: string;

  @ApiProperty({
    example: 409,
    description: 'HTTP status code.',
  })
  statusCode!: number;
}
