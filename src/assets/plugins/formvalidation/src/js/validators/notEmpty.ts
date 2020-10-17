<<<<<<< HEAD
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { Localization, ValidateInput, ValidateOptions, ValidateResult } from '../core/Core';

export default function notEmpty() {
    return {
        validate(input: ValidateInput<ValidateOptions, Localization>): ValidateResult {
            return { valid: input.value !== '' };
        },
    };
}
=======
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { Localization, ValidateInput, ValidateOptions, ValidateResult } from '../core/Core';

export default function notEmpty() {
    return {
        validate(input: ValidateInput<ValidateOptions, Localization>): ValidateResult {
            return { valid: input.value !== '' };
        },
    };
}
>>>>>>> d05e719b8d76eea2e2bfb31a974d47e8096a290b
