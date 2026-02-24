import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RoomsService } from './rooms.service';

import { RoomIdParam } from './params/room-id.param';
import { CreateRoomDTO } from './dtos/create-room.dto';
import { CreateQuestionDTO } from '../questions/dtos/create-question.dto';

import type { Question } from 'src/entities/Question';
import type { Room } from 'src/entities/Room';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  list(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':roomId/questions')
  listQuestionsByRoomId(@Param() { roomId }: RoomIdParam): Promise<Question[]> {
    return this.roomsService.findQuestionsByRoomId(roomId);
  }

  @Post()
  create(@Body() data: CreateRoomDTO): Promise<Room> {
    return this.roomsService.create(data);
  }

  @Post(':roomId/questions')
  createQuestion(
    @Param() { roomId }: RoomIdParam,
    @Body() data: CreateQuestionDTO,
  ): Promise<Question> {
    return this.roomsService.createQuestion({ roomId, ...data });
  }
}
