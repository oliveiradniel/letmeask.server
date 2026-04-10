import { ApiProperty } from '@nestjs/swagger';

export class UploadAudioResponse {
  @ApiProperty({
    example: '75614772-8a4d-4b34-9f91-b8d07ec0890d',
  })
  roomId!: string;

  @ApiProperty({
    example: 'f7c89e70-fb40-438a-9797-7a5514778360',
  })
  id!: string;

  @ApiProperty({
    example:
      'React é uma biblioteca para construção de interfaces reativas, tendo como pontos principais a componentização e seu ciclo de vida controlado através dos hooks.',
  })
  transcription!: string;

  @ApiProperty({
    example: '2026-04-08T17:28:13.948Z',
  })
  createdAt!: Date;
}
