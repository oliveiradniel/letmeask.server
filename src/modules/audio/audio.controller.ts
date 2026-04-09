import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AudioService } from './audio.service';

import { RoomIdParam } from '../rooms/params/room-id.param';

import type { AudioChunkWithoutEmbedding } from './types/audio-chunk-without-embedding';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('rooms/:roomId')
  @UseInterceptors(FileInterceptor('audio'))
  upload(
    @Param() { roomId }: RoomIdParam,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(webm)$/ }),
        ],
      }),
    )
    audio: Express.Multer.File,
  ): Promise<AudioChunkWithoutEmbedding> {
    return this.audioService.create(roomId, audio);
  }
}
