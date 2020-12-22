import { DecoratorBuilder } from './base-builder';
import { SwaggerBuilder } from './swagger-builder';
import { TransformerBuilder } from './transformer-builder';
import { ValidatorBuilder } from './validator-builder';

// TODO: defined multiple imports with different builders with different
// default options. For example: set `expose` to true or disable the swagger mixin

export const DefaultDecoratorBuilder = SwaggerBuilder(
    ValidatorBuilder(
        TransformerBuilder(
            DecoratorBuilder,
        ),
    ),
);
