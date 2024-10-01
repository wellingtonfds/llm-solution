import { NotFoundException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class MeasureNotFoundException extends NotFoundException {

    @ApiProperty()
    public error_code: string

    @ApiProperty()
    private error_message: string
    constructor() {
        super('Leitura do mês já realizada');
        this.error_code = 'MEASURE_NOT_FOUND';
    }
}