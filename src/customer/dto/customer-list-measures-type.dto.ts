import { MeasureType } from "@prisma/client"
import { IsEnum } from "class-validator"

export class CustomerListMeasuresTypeDto {
    @IsEnum(MeasureType)
    measure_type: MeasureType
}