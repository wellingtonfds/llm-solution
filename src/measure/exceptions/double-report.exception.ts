import { ConflictException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class DoubleReporteException extends ConflictException {

    @ApiProperty()
    private error_code: string

    @ApiProperty()
    private error_message: string
    constructor() {
        super('Leitura do mês já realizada');
        this.name = 'DOUBLE_REPORT';
    }
}