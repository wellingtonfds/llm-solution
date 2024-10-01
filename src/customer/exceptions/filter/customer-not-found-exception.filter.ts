import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { CustomerNotFoundException } from '../customer-not-fount.exception';


@Catch(CustomerNotFoundException)
export class CustomerNotFoundExceptionFilter implements ExceptionFilter {

    catch(exception: CustomerNotFoundException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        response
            .status(exception.getStatus())
            .json({
                error_code: exception.error_code,
                error_description: exception.message
            });
    }
}