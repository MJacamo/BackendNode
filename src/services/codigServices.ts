import FlakeIdGen from 'flake-idgen';
let intformat = require('biguint-format')
const generator = new FlakeIdGen();

export const generate = ():string => {
    let x = generator.next();
    let codigo = intformat(x, 'dec');
    return codigo;
};