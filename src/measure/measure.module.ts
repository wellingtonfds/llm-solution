import { Module } from '@nestjs/common';
import { GenerativeAiModule } from '../generative-ai/generative-ai.module';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';
import { MeasureRepository } from './repository/measure.repository';

@Module({
  controllers: [MeasureController],
  providers: [MeasureService, MeasureRepository],
  imports: [GenerativeAiModule],
})
export class MeasureModule { }
