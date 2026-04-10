import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { RoomsService } from './rooms.service';

import { CreateRoomDTO } from './dtos/create-room.dto';

import type { Room } from 'src/entities/Room';
import type { RoomWithQuestionCount } from './types/room-with-question-count.type';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  list(): Promise<RoomWithQuestionCount[]> {
    return this.roomsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateRoomDTO): Promise<Room> {
    return this.roomsService.create(data);
  }
}
