import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DoubleReporteException } from '../double-report.exception';


@Catch(DoubleReporteException)
export class DoubleReportExceptionFilter implements ExceptionFilter {

    catch(exception: DoubleReporteException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        response
            .status(exception.getStatus())
            .json({
                error_code: exception.name,
                error_description: exception.message
            });
    }
}