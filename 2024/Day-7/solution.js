const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/).map(row => row.replace(':', '').split(' ').map(Number));

const formulaProduct = (quantities, operators) => {
    let product = quantities[0];
    for (let i = 1; i < quantities.length; i++) {
        if (operators[i - 1] === '0') {
            product += quantities[i];
        } else if (operators[i - 1] === '1') {
            product *= quantities[i];
        } else if (operators[i - 1] === '2') {
            product = Number(String(product) + quantities[i]);
        }
    }
    return product;
};

const validateEquation = (equationData, base) => {
    let operatorString;
    for (let i = 0; i < Math.pow(base, equationData.length - 2); i++) {
        operatorString = i.toString(base).padStart(equationData.length - 2, '0');
        if (formulaProduct(equationData.slice(1), operatorString) === equationData[0]) return true;
    }
    return false;
};

let P1 = 0;
let P2 = 0;
for (let i = 0; i < input.length; i++) {
    if (validateEquation(input[i], 2)) {
        P1 += input[i][0];
    }
    if (validateEquation(input[i], 3)) {
        P2 += input[i][0];
    }
}
console.log(P1, P2);