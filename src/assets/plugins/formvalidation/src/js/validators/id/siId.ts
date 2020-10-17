<<<<<<< HEAD
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import jmbg from './jmbg';

/**
 * @returns {ValidateResult}
 */
export default function siId(value: string) {
    return {
        meta: {},
        valid: jmbg(value, 'SI'),
    };
}
=======
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import jmbg from './jmbg';

/**
 * @returns {ValidateResult}
 */
export default function siId(value: string) {
    return {
        meta: {},
        valid: jmbg(value, 'SI'),
    };
}
>>>>>>> d05e719b8d76eea2e2bfb31a974d47e8096a290b
