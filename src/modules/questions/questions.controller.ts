import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { QuestionsService } from './questions.service';

import { RoomIdParam } from '../rooms/params/room-id.param';
import { CreateQuestionDTO } from './dtos/create-question.dto';

import type { Question } from 'src/entities/Question';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('/rooms/:roomId')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param() { roomId }: RoomIdParam,
    @Body() data: CreateQuestionDTO,
  ): Promise<Question> {
    return this.questionsService.create(roomId, data.question);
  }
}
