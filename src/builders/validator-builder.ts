import { IsDefined, IsOptional } from 'class-validator';

import { Constructor, DecoratorBuilder } from './base-builder';

export interface Validating {
    optional(): this;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ValidatorBuilder<B extends Constructor<DecoratorBuilder>>(Base: B) {
    return class ValidatorMixin extends Base implements Validating {

        /* Mark property as optional.
         */
        public optional(): this {
            this.add(IsOptional());
            return this;
        }

        /* Mark property as required.
         */
        public required(): this {
            this.add(IsDefined());
            return this;
        }

        public maybeRequired(): this {
            if (this.options.optional) {
                return this.optional();
            }
            return this.required();
        }
    };
}
