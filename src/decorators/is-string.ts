import { ApiProperty } from '@nestjs/swagger';
import { IsString as IsStringValidator } from 'class-validator';

import { DecoratorBuilder } from '../builder';
import { ComposedPropertyDecorator, DecoratorOptions } from '../types';

export interface StringOptions extends DecoratorOptions {
    format?: string,
}

export function IsString(options: StringOptions = {}): ComposedPropertyDecorator {
    return DecoratorBuilder.create(
        IsStringValidator(),
        options,
    ).add(
        // TODO: add api property to builder sub-type
        /* Document as an API Property.
         */
        ApiProperty({
            description: options.description,
            format: options.format,
            type: 'string',
        }),
    ).build();
}
