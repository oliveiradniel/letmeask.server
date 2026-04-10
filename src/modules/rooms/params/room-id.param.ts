import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsUUID } from 'class-validator';

export class RoomIdParam {
  @ApiProperty({
    example: '1881ef7a-f155-412f-bb92-4da9d228a098',
    description: 'Room id.',
  })
  @IsUUID()
  @IsNotEmpty()
  roomId!: string;
}
