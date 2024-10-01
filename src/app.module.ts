import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import dataConfigGoogle from './config/generative-ai.config';
import { CustomerModule } from './customer/customer.module';
import { GenerativeAiModule } from './generative-ai/generative-ai.module';
import { MeasureModule } from './measure/measure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataConfigGoogle]
    }),
    MeasureModule,
    CustomerModule,
    GenerativeAiModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
