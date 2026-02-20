import { Body, Controller, Get, Post } from '@nestjs/common';

import { RoomsService } from './rooms.service';

import type { Room } from 'src/entities/Room';
import { CreateRoomDTO } from './dtos/create-room.do';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  list(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Post()
  create(@Body() data: CreateRoomDTO): Promise<Room> {
    return this.roomsService.create(data);
  }
}
