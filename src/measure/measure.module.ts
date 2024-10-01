import { Module } from '@nestjs/common';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';
import { MeasureRepository } from './repository/measure.repository';

@Module({
  controllers: [MeasureController],
  providers: [MeasureService, MeasureRepository],
})
export class MeasureModule { }
