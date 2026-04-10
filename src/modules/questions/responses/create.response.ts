import { ApiProperty } from '@nestjs/swagger';

import type { Question } from 'src/entities/Question';

export class CreateResponse {
  @ApiProperty({
    example: {
      answer:
        'No React hooks são funções que nos permite controlar o ciclo de vida de um componente.',
      createdAt: '2026-04-08T17:28:14.028Z',
      id: '76b97c71-38db-4550-92c8-53dccc593d94',
      question: 'O que são hooks?',
      roomId: 'c9b39c69-0b22-4a58-adb9-1973d383e820',
    },
  })
  questions!: Question;
}
