import { Type } from "class-transformer";

export default class CreateMapDto {
  @Type(() => Number)
  userId: number;

  name: string;
};