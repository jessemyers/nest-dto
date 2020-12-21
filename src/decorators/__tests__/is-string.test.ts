import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { IsString } from '../is-string';

class Fixture {
    @IsString()
    public stringValue!: string;

    @IsString({ optional: true })
    public optionalStringValue!: string;
}

describe('IsString', () => {
    const options = {
        excludeExtraneousValues: true,
    };

    it('returns error if required string is omitted', async () => {
        const data = {
        };

        const value = plainToClass(Fixture, data, options);
        const errors = await validate(value);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not return error if optional string is omitted', async () => {
        const data = {
            stringValue: 'string-value',
        };

        const value = plainToClass(Fixture, data, options);
        const errors = await validate(value);
        expect(errors).toHaveLength(0);
    });
    it('returns error if optional string is not a string', async () => {
        const data = {
            stringValue: 'string-value',
            optionalStringValue: 42,
        };

        const value = plainToClass(Fixture, data, options);
        const errors = await validate(value);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
});
