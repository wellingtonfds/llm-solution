import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GenerativeAiModule } from '../generative-ai/generative-ai.module';
import { GenerativeAiService } from '../generative-ai/generative-ai.service';
import { GoogleAIProvider } from '../generative-ai/google.provider';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';
import { MeasureRepository } from './repository/measure.repository';

describe('MeasureController', () => {
  let controller: MeasureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureController],
      providers: [MeasureService, GenerativeAiService, GoogleAIProvider, ConfigService, MeasureRepository],
      imports: [GenerativeAiModule, ConfigModule]
    }).compile();

    controller = module.get<MeasureController>(MeasureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
