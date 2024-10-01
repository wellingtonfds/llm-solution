import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GenerativeAiModule } from '../generative-ai/generative-ai.module';
import { GenerativeAiService } from '../generative-ai/generative-ai.service';
import { GoogleAIProvider } from '../generative-ai/google.provider';
import { MeasureService } from './measure.service';
import { MeasureRepository } from './repository/measure.repository';

describe('MeasureService', () => {
  let service: MeasureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasureService, MeasureRepository, GenerativeAiService, ConfigService, GoogleAIProvider],
      imports: [GenerativeAiModule, ConfigModule]
    }).compile();

    service = module.get<MeasureService>(MeasureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
