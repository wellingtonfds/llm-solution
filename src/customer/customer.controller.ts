import { Controller, Get, Param, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MeasureType } from '@prisma/client';
import { MeasureNotFoundException } from '../measure/exceptions/measure-not-found.exception';
import { BadRequestDto } from '../shared/dto/bad-request-dto';
import { CustomerService } from './customer.service';
import { CustomerListMeasuresTypeDto } from './dto/customer-list-measures-type.dto';
import { CustomerListDTO } from './dto/customer-list-measures.dto';
import { CustomerNotFoundExceptionFilter } from './exceptions/filter/customer-not-found-exception.filter';
import { CustomerListMeasuresInterceptor } from './serialize/customer-list-measures.serialize';


@Controller('')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @ApiOkResponse({
    description: 'Operação realizada com sucesso',
    type: CustomerListDTO,
  })
  @ApiBadRequestResponse({
    description: 'Parâmetro measure type diferente de WATER ou GAS',
    type: BadRequestDto,
  })
  @ApiNotFoundResponse({
    description: 'Nenhum registro encontrad',
    type: MeasureNotFoundException,
  })
  @UseInterceptors(CustomerListMeasuresInterceptor)
  @UseFilters(CustomerNotFoundExceptionFilter)
  @ApiQuery({
    name: 'measure_type',
    enum: MeasureType,
    type: 'enum',
    enumName: 'MeasureType',
    required: false,
    description: 'Tipo de leitura (Medição, Amostra)'  // Lista de valores possíveis
  })
  @Get(':id/list')
  public async findOne(@Param('id') id: string, @Query() { measure_type }: CustomerListMeasuresTypeDto) {
    return this.customerService.listMeasureByCustomerCode(id, measure_type);
  }

}
