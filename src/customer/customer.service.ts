import { Injectable } from '@nestjs/common';
import { MeasureType } from '@prisma/client';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerWithMeasure } from './types/customer-with-measures';

@Injectable()
export class CustomerService {

    constructor(private customerRepository: CustomerRepository) {
    }
    public async listMeasureByCustomerCode(costumerId: string, measure_type: MeasureType): Promise<CustomerWithMeasure> {
        return this.customerRepository.listMeasureByCustomerCode(costumerId, measure_type)
    }

}
