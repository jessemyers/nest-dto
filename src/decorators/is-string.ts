import { IsString as IsStringValidator } from 'class-validator';

import { DefaultDecoratorBuilder } from '../builders';
import { ComposedPropertyDecorator, DecoratorOptions } from '../types';

export function IsString(options: DecoratorOptions = {}): ComposedPropertyDecorator {
    return new DefaultDecoratorBuilder(options, IsStringValidator())
        .api()
        .maybeExpose()
        .maybeRequired()
        .build();
}
