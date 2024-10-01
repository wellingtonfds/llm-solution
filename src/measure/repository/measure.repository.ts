import { Measure, MeasureType, PrismaClient } from "@prisma/client";
import { CreateMeasureDto } from "../dto/create-measure.dto";
import { UpdateMeasureDto } from "../dto/update-measure.dto";
import { MeasureDoubleConfirmationException } from "../exceptions/measure-double-confirmation.exception";
import { MeasureWithCustomer } from "../types/measure-with-costumer";

export class MeasureRepository extends PrismaClient {

    public async create({ customer_code, measure_datetime, ...createMeasureDto }: CreateMeasureDto): Promise<MeasureWithCustomer> {
        return this.measure.create({
            include: {
                customer: true
            },
            data: {
                image_url: createMeasureDto.image,
                measure_type: createMeasureDto.measure_type,
                measure_datetime,
                customer: {
                    connectOrCreate: {
                        where: {
                            customer_code
                        },
                        create: {
                            customer_code
                        }
                    },
                }
            }
        })
    }

    public async findByCustomerIdAndMeasureDateAndType(customer_code: string, measure_datetime: Date, measure_type: MeasureType): Promise<Measure[]> {
        return this.measure.findMany({
            where: {
                customer: {
                    customer_code
                },
                measure_datetime: {
                    equals: measure_datetime
                },
                measure_type
            }
        })
    }
    public async findAll(): Promise<Measure[]> {
        return this.measure.findMany()
    }

    public async findById(id: string): Promise<Measure | null> {
        return this.measure.findUnique({ where: { id } })
    }
    public async confirme({ measure_uuid, confirmed_value }: UpdateMeasureDto): Promise<Measure> {

        try {
            return await this.measure.update({
                where: {
                    id: measure_uuid,
                    confirmed_value: null,
                },
                data: {
                    confirmed_value
                }
            })
        } catch (e) {
            if (e.code === 'P2025') {
                throw new MeasureDoubleConfirmationException()
            }
        }

    }
}
