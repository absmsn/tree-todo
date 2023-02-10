export default class CreateNodeDto {
  mapId: number;
  title: string;
  finishTime: Date;
  finished: Boolean;
  comment: string;
  priority: number;
  autoFinish: boolean;
  parentId: number;
};