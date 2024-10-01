import { Body, Controller, Patch, Post, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BadRequestDto } from '../shared/dto/bad-request-dto';
import { storeImage } from '../shared/local-file-maneger';
import { CreateMeasureResponseDto } from './dto/create-measure-response.dto';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureSuccessDto } from './dto/update-measure-success.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { DoubleReporteException } from './exceptions/double-report.exception';
import { DoubleReportExceptionFilter } from './exceptions/filter/double-report-execption.filter';

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
  constructor(private readonly measureService: MeasureService) { }


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
  async create(@Body() { image, ...createMeasureDto }: CreateMeasureDto): Promise<MeasureWithCustomer> {

    const filePath = storeImage(image)
    return this.measureService.create({
      ...createMeasureDto,
      image: ''
    });
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
    return response.ok((new UpdateMeasureSuccessDto()).success === true)
  }
}
