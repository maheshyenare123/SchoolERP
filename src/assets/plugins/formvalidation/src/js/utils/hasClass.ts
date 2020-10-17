<<<<<<< HEAD
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

export default function hasClass(element: HTMLElement, clazz: string): boolean {
    return element.classList
        ? element.classList.contains(clazz)
        : new RegExp(`(^| )${clazz}( |$)`, 'gi').test(element.className);
}
=======
/**
 * FormValidation (https://formvalidation.io)
 * The best validation library for JavaScript
 * (c) 2013 - 2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

export default function hasClass(element: HTMLElement, clazz: string): boolean {
    return element.classList
        ? element.classList.contains(clazz)
        : new RegExp(`(^| )${clazz}( |$)`, 'gi').test(element.className);
}
>>>>>>> d05e719b8d76eea2e2bfb31a974d47e8096a290b
