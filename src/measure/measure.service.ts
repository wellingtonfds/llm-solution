import { BadRequestException, Injectable } from '@nestjs/common';
import { Measure } from '@prisma/client';
import { GenerativeAiService } from '../generative-ai/generative-ai.service';
import { storeImage } from '../shared/local-file-maneger';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { DoubleReporteException } from './exceptions/double-report.exception';
import { MeasureNotFoundException } from './exceptions/measure-not-found.exception';
import { MeasureRepository } from './repository/measure.repository';
import { MeasureWithCustomer } from './types/measure-with-costumer';

@Injectable()
export class MeasureService {

  constructor(private readonly measureRepository: MeasureRepository, private readonly generativeAiService: GenerativeAiService) { }

  async validateCreate(createMeasureDto: CreateMeasureDto): Promise<void> {

    const checkExiste = await this.measureRepository.findByCustomerIdAndMeasureDateAndType(
      createMeasureDto.customer_code,
      createMeasureDto.measure_datetime,
      createMeasureDto.measure_type)
    if (checkExiste.length) {
      throw new DoubleReporteException()
    }
  }

  async create(createMeasureDto: CreateMeasureDto): Promise<MeasureWithCustomer> {
    await this.validateCreate(createMeasureDto)
    const file = storeImage(createMeasureDto.image)
    const response = await this.generativeAiService.generateContent(file.path, file.mimeType)
    return this.measureRepository.create({
      ...createMeasureDto,
      image: file.path,
      measure_value: response
    })
  }

  public async confirme(updateMeasureDto: UpdateMeasureDto): Promise<Measure> {
    const measure = await this.measureRepository.findById(updateMeasureDto.measure_uuid)
    if (!measure) {
      throw new MeasureNotFoundException()

    }
    if (measure?.confirmed_value === updateMeasureDto.confirmed_value) {
      throw new BadRequestException({
        error_code: 'DOUBLE_REPORT_CONFIRMED',
        error_message: 'O código de leitura informado já existe'
      })
    }
    return this.measureRepository.confirme(updateMeasureDto);
  }
}

