import chalk from 'chalk';
import inquirer from 'inquirer';
import readline from 'readline';

let isFirstTime = true;

function initializeCube3x3() {
  const cube = {
    front: [
      ['w1', 'w2', 'w3'],
      ['w4', 'w5', 'w6'],
      ['w7', 'w8', 'w9'],
    ],
    back: [
      ['y1', 'y2', 'y3'],
      ['y4', 'y5', 'y6'],
      ['y7', 'y8', 'y9'],
    ],
    up: [
      ['b1', 'b2', 'b3'],
      ['b4', 'b5', 'b6'],
      ['b7', 'b8', 'b9'],
    ],
    down: [
      ['g1', 'g2', 'g3'],
      ['g4', 'g5', 'g6'],
      ['g7', 'g8', 'g9'],
    ],
    right: [
      ['r1', 'r2', 'r3'],
      ['r4', 'r5', 'r6'],
      ['r7', 'r8', 'r9'],
    ],
    left: [
      ['o1', 'o2', 'o3'],
      ['o4', 'o5', 'o6'],
      ['o7', 'o8', 'o9'],
    ],
  };
  return cube;
}

function printCube(cube) {
  console.log(
    '       ',
    cube.up[0]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ')
  );
  console.log(
    '       ',
    cube.up[1]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ')
  );
  console.log(
    '       ',
    cube.up[2]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ')
  );

  for (let i = 0; i < 3; i++) {
    const row = cube.left[i]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ');
    const row2 = cube.front[i]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ');
    const row3 = cube.right[i]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ');
    const row4 = cube.back[i]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ');
    console.log(row + '  ' + row2 + '  ' + row3 + '  ' + row4);
  }

  console.log(
    '       ',
    cube.down[0]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ')
  );
  console.log(
    '       ',
    cube.down[1]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ')
  );
  console.log(
    '       ',
    cube.down[2]
      .map((color) => getChalkColor(color).bold(color.toUpperCase()))
      .join(' ')
  );
  console.log('\n');
}

function getChalkColor(color) {
  let chalkColor;
  if (color.startsWith('w')) {
    chalkColor = chalk.white;
  } else if (color.startsWith('y')) {
    chalkColor = chalk.yellow;
  } else if (color.startsWith('b')) {
    chalkColor = chalk.blue;
  } else if (color.startsWith('g')) {
    chalkColor = chalk.green;
  } else if (color.startsWith('r')) {
    chalkColor = chalk.red;
  } else if (color.startsWith('o')) {
    chalkColor = chalk.hex('#FFA500');
  } else {
    chalkColor = chalk.white;
  }
  return chalkColor;
}

function interactiveUser(cube) {
  if (!isFirstTime) {
    console.log('¡Bienvenido de nuevo!');
  } else {
    console.log('¡Bienvenido!');
    isFirstTime = false;
  }

  let continueLoop = true;
  let newCube = cube;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.input.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      console.log(chalk.yellow('\n¡Adiós!'));
      rl.close();
      process.exit();
    }
  });

  function askQuestion() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'cellName',
          message: 'Ingresa el nombre de la casilla que quieres mover:',
        },
        {
          type: 'list',
          name: 'direction',
          message: 'Ingresa la dirección en la que quieres mover la casilla:',
          choices: ['up', 'down', 'right', 'left'],
        },
      ])
      .then((answers) => {
        newCube = moveCube(newCube, answers);
        console.log('¡Listo! La casilla ha sido movida.');
        printCube(newCube);
        askQuestion();
      })
      .catch((error) => {
        console.error(error);
        rl.close();
        process.exit();
      });
  }

  rl.input.setRawMode(true);
  askQuestion();
}

function moveCube(cube, move) {
  // Obtener la cara y las coordenadas de la celda a mover utilizando findCell
  const [face, row, col] = findCell(cube, move.cellName);

  // Si la celda no se encuentra en el cubo, devuelve el cubo original sin cambios
  if (face === null || row === null || col === null) {
    return cube;
  }

  // Copiar el cubo original para mantenerlo inmutable
  const newCube = { ...cube };

  // Obtener los datos de la cara en la que se encuentra la celda
  const faceData = newCube[face];

  // Calcular las nuevas coordenadas de la celda utilizando getNewPosition
  const [newRow, newCol] = getNewPosition(row, col, move.direction);

  // Verificar si las nuevas coordenadas son válidas utilizando isValidPosition
  if (!isValidPosition(newRow, newCol)) {
    // Si las coordenadas no son válidas, imprimir un mensaje de depuración y devolver el cubo original sin cambios
    console.log(chalk.red.bold('DEBUG:[Invalid position]:'), newRow, newCol);
    return cube;
  }

  // Intercambiar los valores de la celda original y la celda de destino
  const cellValue = faceData[row][col];
  faceData[row][col] = faceData[newRow][newCol];
  faceData[newRow][newCol] = cellValue;

  // Devolver el nuevo cubo con la celda movida
  return newCube;
}

function findCell(cube, cellName) {
  for (const [face, faceData] of Object.entries(cube)) {
    for (let row = 0; row < faceData.length; row++) {
      const col = faceData[row].indexOf(cellName);
      if (col !== -1) {
        return [face, row, col];
      }
    }
  }
  console.error(`No se encontró la casilla ${cellName}`);
  return [null, null, null];
}

function getNewPosition(row, col, direction) {
  switch (direction) {
    case 'up':
      return [row - 1, col];
    case 'down':
      return [row + 1, col];
    case 'left':
      return [row, col - 1];
    case 'right':
      return [row, col + 1];
    default:
      return [row, col];
  }
}

function isValidPosition(row, col) {
  return row >= 0 && row < 3 && col >= 0 && col < 3;
}

let cube = initializeCube3x3();
printCube(cube);
interactiveUser(cube);
