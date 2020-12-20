import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
    IsDefined,
    IsOptional,
    IsString as IsStringValidator,
} from 'class-validator';
import { compose, ComposedPropertyDecorator } from './compose';

export interface StringOptions {
    description?: string;
    format?: string,
    optional?: boolean;
}

export function IsString(options: StringOptions = {}): ComposedPropertyDecorator {
    return compose([
        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        Expose(),

        /* Validate input data as a string.
         */
        IsStringValidator(),

        /* Determine whether the input data is optional.
         */
        options.optional ? IsOptional() : IsDefined(),

        /* Document as an API Property.
         */
        ApiProperty({
            description: options.description,
            format: options.format,
            type: 'string',
        }),
    ]);
}
