"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmail = exports.createPassword = void 0;
const createPassword = (dni, name1, name2, surname1, surname2) => {
    const a = name1.toUpperCase().replace(/\s/g, '').replace(/Ñ/g, 'NI')[0];
    const b = name2.toUpperCase().replace(/\s/g, '').replace(/Ñ/g, 'NI')[0];
    const c = surname1.toUpperCase().replace(/\s/g, '').replace(/Ñ/g, 'NI');
    const d = surname2.toUpperCase().replace(/\s/g, '').replace(/Ñ/g, 'NI');
    const aa = a.charCodeAt(0) - 64;
    const bb = b.charCodeAt(0) - 64;
    const dniModify = dni[0] + dni[2] + dni[4] + dni[6];
    return `${c[0]}${d[0]}${aa}${bb}${dniModify}`;
};
exports.createPassword = createPassword;
const createEmail = (name, surname1, surname2) => {
    const a = name.toLowerCase().replace(/\s/g, '').replace(/ñ/g, 'ni');
    const b = surname1.toLowerCase().replace(/\s/g, '').replace(/ñ/g, 'ni');
    const c = surname2.toLowerCase().replace(/\s/g, '').replace(/ñ/g, 'ni');
    return `${a}${b}${c[0]}@cienciasperu.edu.pe`;
};
exports.createEmail = createEmail;
//# sourceMappingURL=stringPreprocesor.js.map