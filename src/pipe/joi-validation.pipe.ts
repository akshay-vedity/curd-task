import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {

    constructor (private schema: ObjectSchema) {}

    public transform(value: any): any {

        const result = this.schema.validate(value, { 
            abortEarly: false,
            // allowUnknown: true
        });

        if (result.error) {
            let errors = result.error.details.map(item => item.message );
            throw new HttpException({
                message: 'ValidationError',
                detail: errors,
            }, HttpStatus.OK);
        }

        return result.value;
    }
}
