import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { RoomsService } from './rooms.service';

import { CreateRoomDTO } from './dtos/create-room.dto';

import { ListRoomsResponse } from './reponses/list-rooms.reponse';
import { CreateRoomResponse } from './reponses/create-room.reponse';
import { ConflictResponse } from './reponses/conflict.response';
import { NotFoundRoomResponse } from './reponses/not-found-room.response';
import { InvalidRequestDataResponse } from './reponses/invalid-request-data.response';

import type { Room } from 'src/entities/Room';
import type { RoomWithQuestionCount } from './types/room-with-question-count.type';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOkResponse({
    description: 'List all rooms',
    type: ListRoomsResponse,
  })
  @Get()
  list(): Promise<RoomWithQuestionCount[]> {
    return this.roomsService.findAll();
  }

  @ApiCreatedResponse({
    description: 'Create room.',
    type: CreateRoomResponse,
  })
  @ApiConflictResponse({
    description: 'This room name already in use.',
    type: ConflictResponse,
  })
  @ApiNotFoundResponse({
    description: 'Room not found.',
    type: NotFoundRoomResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data.',
    type: InvalidRequestDataResponse,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateRoomDTO): Promise<Room> {
    return this.roomsService.create(data);
  }
}
