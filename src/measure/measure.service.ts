import { BadRequestException, Injectable } from '@nestjs/common';
import { Measure } from '@prisma/client';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { DoubleReporteException } from './exceptions/double-report.exception';
import { MeasureNotFoundException } from './exceptions/measure-not-found.exception';
import { MeasureRepository } from './repository/measure.repository';
import { MeasureWithCustomer } from './types/measure-with-costumer';

@Injectable()
export class MeasureService {

  constructor(private measureRepository: MeasureRepository) { }
  async create(createMeasureDto: CreateMeasureDto): Promise<MeasureWithCustomer> {

    const checkExiste = await this.measureRepository.findByCustomerIdAndMeasureDateAndType(
      createMeasureDto.customer_code,
      createMeasureDto.measure_datetime,
      createMeasureDto.measure_type)
    if (checkExiste.length) {
      throw new DoubleReporteException()
    }
    return this.measureRepository.create(createMeasureDto)

  }

  findAll() {
    return `This action returns all measure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} measure`;
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

