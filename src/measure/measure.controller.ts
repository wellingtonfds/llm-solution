import { Body, Controller, Get, HttpStatus, Patch, Post, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BadRequestDto } from '../shared/dto/bad-request-dto';
import { CreateMeasureResponseDto } from './dto/create-measure-response.dto';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureSuccessDto } from './dto/update-measure-success.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { DoubleReporteException } from './exceptions/double-report.exception';
import { DoubleReportExceptionFilter } from './exceptions/filter/double-report-execption.filter';

import { Response } from 'express';
import { join } from 'node:path';
import { MeasureDoubleConfirmationExceptionFilter } from './exceptions/filter/measure-double-confirmation-execption.filter';
import { MeasureNotFoundExceptionFilter } from './exceptions/filter/measure-not-found-exception.filter';
import { MeasureDoubleConfirmationException } from './exceptions/measure-double-confirmation.exception';
import { MeasureNotFoundException } from './exceptions/measure-not-found.exception';
import { MeasureService } from './measure.service';
import { CreateMeasureResponseSerializeInterceptor } from './serialize/create-measure-response.serialize';
import { MeasureWithCustomer } from './types/measure-with-costumer';

@Controller('/')
@ApiTags('Measure')
export class MeasureController {
  constructor(
    private readonly measureService: MeasureService,
  ) { }


  @Post('upload')
  @ApiCreatedResponse({
    description: 'Create a new Measure',
    type: CreateMeasureResponseDto,
  })
  @ApiConflictResponse({
    description: 'Measure already exist',
    type: DoubleReporteException,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: BadRequestDto,
  })
  @UseFilters(DoubleReportExceptionFilter)
  @UseInterceptors(CreateMeasureResponseSerializeInterceptor)
  async create(@Body() createMeasureDto: CreateMeasureDto): Promise<MeasureWithCustomer> {
    return this.measureService.create(createMeasureDto);
  }

  @Patch('confirm')
  @UseFilters(MeasureNotFoundExceptionFilter, MeasureDoubleConfirmationExceptionFilter)
  @ApiBadRequestResponse({
    description: 'Os dados fornecidos no corpo da requisição são inválidos',
    type: MeasureNotFoundException,
  })
  @ApiNotFoundResponse({
    description: 'Leitura não encontrada',
    type: MeasureNotFoundException,
  })
  @ApiOkResponse({
    description: 'Operação realizada com sucesso',
    type: UpdateMeasureSuccessDto,
  })
  @ApiConflictResponse({
    description: 'Leitura já confirmada',
    type: MeasureDoubleConfirmationException,
  })
  async confirme(@Body() updateMeasureDto: UpdateMeasureDto, @Res() response) {
    await this.measureService.confirme(updateMeasureDto)
    const res = new UpdateMeasureSuccessDto()
    res.success = true;
    return response.status(HttpStatus.OK).send(res)
  }

  @Get('file')
  showFile(@Res() res: Response) {
    return res.sendFile(join(`${process.cwd()}/src/storage/84de2b8e-e3c1-48bc-aab0-7897460665dc.jpeg`));
  }
}
