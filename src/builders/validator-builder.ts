import { IsDefined, IsOptional } from 'class-validator';

import { Constructor, DecoratorBuilder } from './base-builder';

export interface Validating {
    optional(): DecoratorBuilder;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ValidatorBuilder<B extends Constructor<DecoratorBuilder>>(Base: B) {
    return class ValidatorMixin extends Base implements Validating {

        /* Mark property as optional.
         */
        public optional(): DecoratorBuilder {
            this.add(IsOptional());
            return this;
        }

        /* Mark property as required.
         */
        public required(): DecoratorBuilder {
            this.add(IsDefined());
            return this;
        }

        public maybeRequired(): DecoratorBuilder {
            if (this.options.optional) {
                return this.optional();
            }
            return this.required();
        }
    };
}
