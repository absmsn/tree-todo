import { 
  Body,
  Controller,
  Put,
  Param,
  Delete
} from '@nestjs/common';
import { ConditionService } from './condition.service';
import EditConditionDto from './dto/edit-condition.dto';

@Controller('/api/condition')
export class ConditionController {
  constructor(
    private readonly conditionService: ConditionService
  ) {}

  @Put("/source/:sourceId/target/:targetId")
  async edit(@Param() params: any, @Body() body: EditConditionDto) {
    await this.conditionService.edit(params.sourceId, params.targetId, body);
  }

  @Delete("/source/:sourceId/target/:targetId")
  async remove(@Param() params: any) {
    await this.conditionService.remove(params.sourceId, params.targetId);
  }
}
