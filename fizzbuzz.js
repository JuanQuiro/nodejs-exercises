/*
FizzBuzz 

Escribe, en el lenguaje de programación que desees, un programa que muestre en pantalla los números del 1 al 100, sustituyendo los múltiplos de 3 por el palabro “Fizz” y, a su vez, los múltiplos de 5 por “Buzz”. Para los guarismos que, al tiempo, son múltiplos de 3 y 5, utiliza el combinado “FizzBuzz”.

*/

const number = parseInt(process.argv[2]);
fizzBuzz(number);

function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    let output = '';
    if (i % 3 === 0) output += 'Fizz';
    if (i % 5 === 0) output += 'Buzz';
    console.log(output || i);
  }
}
