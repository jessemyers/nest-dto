import { Expose, Transform, Type } from 'class-transformer';
// NB: reflect-metadata needs to be imported at least once
import 'reflect-metadata';

/* Allow any PropertyDecorator as well as the standard class-transformer decorators.
 *
 * The latter do not quite adhere to the PropertyDecorator syntax so we hve to define
 * a union type with a few extra options.
 */
/* eslint-disable @typescript-eslint/indent */
export type InputDecorator = PropertyDecorator
    | ReturnType<typeof Expose>
    | ReturnType<typeof Transform>
    | ReturnType<typeof Type>;
/* eslint-enable @typescript-eslint/indent */

/* The generated decorator needs to have a reduced set of inputs in order to be
 * compatable with all of the input types.
 */
export type ComposedPropertyDecorator = (target: unknown, propertyKey: string) => void;

/* Create a new Property decorator that composes several other decorators.
 */
export function compose(decorators: InputDecorator[]): ComposedPropertyDecorator {
    return (target: unknown, propertyKey: string): void => {
        for (const decorator of decorators) {
            decorator(target, propertyKey);
        }
    };
}
