import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { QuestionsService } from './questions.service';

import { RoomIdParam } from '../rooms/params/room-id.param';
import { CreateQuestionDTO } from './dtos/create-question.dto';

import { ListResponse } from './responses/list.response';
import { CreateResponse } from './responses/create.response';
import { ServiceUnavailableAIResponse } from '../gemini/responses/service-unavailable-ai.response';
import { TooManyRequestsForAIServiceResponse } from '../gemini/responses/too-many-requests-for-ai-service.response';
import { BadRequestToGenerateEmbeddingResponse } from '../gemini/responses/bad-request-to-generate-embedding.response';
import { NotFoundRoomResponse } from '../rooms/reponses/not-found-room.response';
import { BadRequestToGenerateAnswerResponse } from '../gemini/responses/bad-request-to-generate-answer.response ';

import type { Question } from 'src/entities/Question';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOkResponse({
    description: 'List all questions by room id',
    type: ListResponse,
  })
  @Get('rooms/:roomId')
  listByRoomId(@Param() { roomId }: RoomIdParam): Promise<Question[]> {
    return this.questionsService.findByRoomId(roomId);
  }

  @ApiCreatedResponse({
    description: 'Create question.',
    type: CreateResponse,
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
    description: 'Failed to generate a response from Gemini.',
    type: BadRequestToGenerateAnswerResponse,
  })
  @ApiBadRequestResponse({
    description: 'Room not found.',
    type: NotFoundRoomResponse,
  })
  @Post('rooms/:roomId')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param() { roomId }: RoomIdParam,
    @Body() data: CreateQuestionDTO,
  ): Promise<Question> {
    return this.questionsService.create(roomId, data.question);
  }
}
