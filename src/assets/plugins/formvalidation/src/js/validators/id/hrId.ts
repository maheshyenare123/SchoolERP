<<<<<<< HEAD
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import mod11And10 from '../../algorithms/mod11And10';

/**
 * Validate Croatian personal identification number (OIB)
 *
 * @returns {ValidateResult}
 */
export default function hrId(value: string) {
    return {
        meta: {},
        valid: (/^[0-9]{11}$/.test(value) && mod11And10(value)),
    };
}
=======
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import mod11And10 from '../../algorithms/mod11And10';

/**
 * Validate Croatian personal identification number (OIB)
 *
 * @returns {ValidateResult}
 */
export default function hrId(value: string) {
    return {
        meta: {},
        valid: (/^[0-9]{11}$/.test(value) && mod11And10(value)),
    };
}
>>>>>>> d05e719b8d76eea2e2bfb31a974d47e8096a290b
