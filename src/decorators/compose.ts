import { InputDecorator, ComposedPropertyDecorator } from '../types';

/* Create a new Property decorator that composes several other decorators.
 */
export function compose(decorators: InputDecorator[]): ComposedPropertyDecorator {
    return (target: unknown, propertyKey: string): void => {
        for (const decorator of decorators) {
            decorator(target, propertyKey);
        }
    };
}
