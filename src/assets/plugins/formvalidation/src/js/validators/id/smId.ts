<<<<<<< HEAD
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

/**
 * Validate San Marino citizen number
 *
 * @see http://en.wikipedia.org/wiki/National_identification_number#San_Marino
 * @returns {ValidateResult}
 */
export default function smId(value: string) {
    return {
        meta: {},
        valid: /^\d{5}$/.test(value),
    };
}
=======
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

/**
 * Validate San Marino citizen number
 *
 * @see http://en.wikipedia.org/wiki/National_identification_number#San_Marino
 * @returns {ValidateResult}
 */
export default function smId(value: string) {
    return {
        meta: {},
        valid: /^\d{5}$/.test(value),
    };
}
>>>>>>> d05e719b8d76eea2e2bfb31a974d47e8096a290b
