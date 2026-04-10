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
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { AudioService } from './audio.service';

import { RoomIdParam } from '../rooms/params/room-id.param';

import { UploadAudioResponse } from './responses/upload-audio.response';
import { InvalidRequestDataResponse } from './responses/invalid-request-data.response';
import { BadRequestToGenerateEmbeddingResponse } from '../gemini/responses/bad-request-to-generate-embedding.response';
import { ServiceUnavailableAIResponse } from '../gemini/responses/service-unavailable-ai.response';
import { TooManyRequestsForAIServiceResponse } from '../gemini/responses/too-many-requests-for-ai-service.response';

import type { AudioChunkWithoutEmbedding } from './types/audio-chunk-without-embedding';
import { NotFoundRoomResponse } from '../rooms/reponses/not-found-room.response';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @ApiOkResponse({
    description: 'Upload audio',
    type: UploadAudioResponse,
  })
  @ApiServiceUnavailableResponse({
    description: 'AI service temporarily unavailable. Please try again.',
    type: ServiceUnavailableAIResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests. Please try later.',
    type: TooManyRequestsForAIServiceResponse,
  })
  @ApiBadRequestResponse({
    description: 'The text could not be converted.',
    type: BadRequestToGenerateEmbeddingResponse,
  })
  @ApiBadRequestResponse({
    description: 'Room not found.',
    type: NotFoundRoomResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data.',
    type: InvalidRequestDataResponse,
  })
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
