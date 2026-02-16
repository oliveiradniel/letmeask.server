import { Controller, Get } from '@nestjs/common';

import { RoomsService } from './rooms.service';

import type { Room } from 'src/entities/Room';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  list(): Promise<Room[]> {
    return this.roomsService.findAll();
  }
}
