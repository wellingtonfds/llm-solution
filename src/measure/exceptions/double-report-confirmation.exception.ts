import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from "@nestjs/swagger";

export class DoubleReporteConfirmationException extends BadRequestException {

    @ApiProperty()
    private error_code: string

    @ApiProperty()
    private error_message: string

    constructor() {
        super('O código de leitura informado já existe');
        this.name = 'INVALID_DATA';
    }
}