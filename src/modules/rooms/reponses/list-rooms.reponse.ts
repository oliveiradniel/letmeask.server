import { ApiProperty } from '@nestjs/swagger';

import type { Room } from 'src/entities/Room';

export class ListRoomsResponse {
  @ApiProperty({
    example: [
      {
        createdAt: '2026-04-08T17:28:13.948Z',
        description:
          'Aula sobre React, como ela funciona e como são estruturados seus principais conceitos.',
        id: '1881ef7a-f155-412f-bb92-4da9d228a098',
        name: 'React do zero ao avançado',
        questionCount: 6,
      },
      {
        createdAt: '2026-06-08T17:28:13.948Z',
        description:
          'Nesta aula é abordado como o NestJS funciona por debaixo dos panos e como através dos decorators ele consegue manipular e fazer a injeção de dependência sem precisar de intervenção.',
        id: '1881ef7a-f155-412f-bb92-4da9d228a098',
        name: 'Como funciona a DI no NestJS',
        questionCount: 2,
      },
    ],
  })
  rooms!: Room[];
}
