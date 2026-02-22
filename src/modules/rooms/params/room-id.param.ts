import { IsNotEmpty, IsUUID } from 'class-validator';

export class RoomIdParam {
  @IsUUID()
  @IsNotEmpty()
  roomId!: string;
}
