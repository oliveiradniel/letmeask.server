import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RoomsService } from './rooms.service';

import type { Room } from 'src/entities/Room';
import { CreateRoomDTO } from './dtos/create-room.do';
import { Question } from 'src/entities/Question';
import { RoomIdParam } from './params/room-id.param';

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
}
