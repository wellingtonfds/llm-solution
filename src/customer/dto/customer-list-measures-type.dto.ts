import { ApiProperty } from "@nestjs/swagger"
import { MeasureType } from "@prisma/client"
import { IsEnum } from "class-validator"

export class CustomerListMeasuresTypeDto {



    @ApiProperty({
        type: MeasureType,
        description: 'UUID da medida'
    })
    @IsEnum(MeasureType)
    measure_type: MeasureType



}