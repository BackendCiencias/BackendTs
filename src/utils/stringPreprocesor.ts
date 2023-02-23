export const createPassword = (dni:string, name1:string, name2:string , surname1:string, surname2:string) => {
    const a = name1.toUpperCase().replace(/\s/g, '').replace(/Ñ/g,'NI')[0];
    const b = name2.toUpperCase().replace(/\s/g, '').replace(/Ñ/g,'NI')[0];
    const c = surname1.toUpperCase().replace(/\s/g, '').replace(/Ñ/g,'NI');
    const d = surname2.toUpperCase().replace(/\s/g, '').replace(/Ñ/g,'NI');
    const aa = a.charCodeAt(0) - 64;
    const bb = b.charCodeAt(0) - 64;
    const dniModify = dni[0] + dni[2]+ dni[4] + dni[6];
    return `${c[0]}${d[0]}${aa}${bb}${dniModify}`;
}

export const createEmail = (name:string, surname1:string, surname2:string) => {
    const a = name.toLowerCase().replace(/\s/g, '').replace(/ñ/g,'ni');
    const b = surname1.toLowerCase().replace(/\s/g, '').replace(/ñ/g,'ni');
    const c = surname2.toLowerCase().replace(/\s/g, '').replace(/ñ/g,'ni');
    return `${a}${b}${c[0]}@cienciasperu.edu.pe`;
}