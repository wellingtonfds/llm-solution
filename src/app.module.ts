import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomerModule } from './customer/customer.module';
import { MeasureModule } from './measure/measure.module';

@Module({
  imports: [MeasureModule, CustomerModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
