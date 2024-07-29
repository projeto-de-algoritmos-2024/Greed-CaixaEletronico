const currency = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 25, 10, 5, 1];
let saque = Array(12).fill(0);

function txtToInt(p) {
    let v = p.indexOf(',');
    if (v !== -1) p = p.replace(',', '.');
    return parseFloat(p) * 100;
}

function setSaque(valor) {
    for (let i = 0; i < 12; i++) {
        let current_currency = currency[i];
        let aux = Math.floor(valor / current_currency);
        saque[i] += aux;
        valor -= aux * current_currency;
    }
}

function getSaque() {
    console.log("\x1b[1;34m      Você receberá:\x1b[0m");
    for (let i = 0; i < 12; i++) {
        printCedula(saque[i], currency[i]);
    }
}

function printCedula(amount, currency) {
    if (amount === 0 || currency === 0) return;

    let money_fisical;
    let money_type;

    if (currency < 100) { // Caso currency seja menor que 1 real
        money_type = currency === 1 ? "centavo" : "centavos";
        money_fisical = amount === 1 ? "moéda" : "moédas";
        console.log(`         \x1b[1;34m${amount}\x1b[0m ${money_fisical} de  \x1b[1;34m${currency}\x1b[0m ${money_type}`);
    } else if (currency === 100) { // Caso currency seja igual a 1 real
        money_type = "real";
        money_fisical = amount === 1 ? "moéda" : "moédas";
        console.log(`         \x1b[1;34m${amount}\x1b[0m ${money_fisical} de  \x1b[1;34m${currency / 100}\x1b[0m ${money_type}`);
    } else { // Caso currency seja maior que 1 real
        money_type = "reais";
        money_fisical = amount === 1 ? "cédula" : "cédulas";
        console.log(`         \x1b[1;34m${amount}\x1b[0m ${money_fisical} de \x1b[1;34m${currency / 100}\x1b[0m ${money_type}`);
    }
}

function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('\x1b[1;m\nDigite valor a ser sacado: \x1b[0;m', (input) => {
        let valor = txtToInt(input);

        if (valor < 1) {
            console.clear();
            console.log(`\x1b[1;31mO valor ${input} é uma entrada invalida, tente novamente.\x1b[0;m\n`);
            readline.close();
            main();
        } else {
            setSaque(valor);
            getSaque();
            readline.close();
        }
    });
}

main();
