import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
    IsDefined,
    IsOptional,
    IsEnum as IsEnumValidator,
} from 'class-validator';

import { ComposedPropertyDecorator, DecoratorOptions } from '../types';
import { compose } from './compose';

export interface EnumOptions extends DecoratorOptions {
    enum: Record<string, unknown>,
    enumName?: string;
}

export function IsEnum(options: EnumOptions): ComposedPropertyDecorator {
    return compose([
        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        Expose(),

        /* Validate input data as a string.
         */
        IsEnumValidator(options.enum),

        /* Determine whether the input data is optional.
         */
        options.optional ? IsOptional() : IsDefined(),

        /* Document as an API Property.
         */
        ApiProperty({
            description: options.description,
            enum: options.enum,
            enumName: options.enumName || options.enum.constructor.name,
        }),
    ]);
}
