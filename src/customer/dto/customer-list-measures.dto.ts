import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";


class Measures {
    @Expose()
    @ApiProperty()
    measure_uuid: string

    @Expose()
    @ApiProperty()
    measure_datetime: string

    @Expose()
    @ApiProperty()
    measure_type: string

    @Expose()
    @ApiProperty()
    has_confirmed: string

    @Expose()
    @ApiProperty()
    image_url: string
}


@Exclude()
export class CustomerListDTO {

    @Expose()
    @ApiProperty()
    customer_code: string;

    @Type(() => Measures)
    @Expose()
    measures: Measures[]
}