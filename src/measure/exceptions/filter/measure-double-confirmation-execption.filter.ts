import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MeasureDoubleConfirmationException } from '../measure-double-confirmation.exception';
import { MeasureNotFoundException } from '../measure-not-found.exception';


@Catch(MeasureDoubleConfirmationException)
export class MeasureDoubleConfirmationExceptionFilter implements ExceptionFilter {

    catch(exception: MeasureNotFoundException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        response
            .status(exception.getStatus())
            .json({
                error_code: exception.error_code,
                error_description: exception.message
            });
    }
}