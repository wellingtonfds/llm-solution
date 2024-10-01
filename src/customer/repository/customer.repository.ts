import { MeasureType, PrismaClient } from "@prisma/client";

import { CustomerNotFoundException } from "../exceptions/customer-not-fount.exception";
import { CustomerWithMeasure } from "../types/customer-with-measures";

export class CustomerRepository extends PrismaClient {


    public async listMeasureByCustomerCode(customer_code: string, measure_type: MeasureType): Promise<CustomerWithMeasure> {
        const list = await this.customer.findUnique({
            where: {
                customer_code,

            },
            include: {
                measures: {
                    where: {
                        measure_type,
                    }
                }
            }
        })

        if (list) {
            return list
        }
        throw new CustomerNotFoundException()

    }
}