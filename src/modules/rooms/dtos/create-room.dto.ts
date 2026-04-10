import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDTO {
  @ApiProperty({
    example: 'Como funciona a DI no NestJS',
    description: 'Title of the room.',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example:
      'Nesta aula é abordado como o NestJS funciona por debaixo dos panos e como através dos decorators ele consegue manipular e fazer a injeção de dependência sem precisar de intervenção.',
    description: 'Deitaled description of the room. ',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
