const LEET_ALPHABET = {
  A: ['4', '/\\', '@', '/-\\', '^', 'aye', '(L', 'Д'],
  B: ['13', '|3', 'ß', '!3', '(3', '/3', ')3', '|-]', 'j3', '8'],
  C: ['[', '¢', '{', '<', '('],
  D: [
    ')',
    '|)',
    '(|',
    '[)',
    'I>',
    '|>',
    '?',
    'T)',
    'I7',
    'cl',
    '|}',
    '>',
    '|]',
  ],
  E: ['3', '&', '£', '€', 'ë', '[-', '|=-'],
  F: ['|=', 'ƒ', '|#', 'ph', '/=', '&'],
  G: ['&', '6', '(_+', '9', 'C-', 'gee', '(?', '[,', '{,', '<-'],
  H: [
    '#',
    '/-/',
    '[-]',
    ']-[',
    ')-(',
    '(-)',
    ':-:',
    '|~|',
    '|-|',
    ']~[',
    '}{',
    '!-!',
    '1-1',
    '\\-/',
    'I+I',
  ],
  I: ['1', '[]', '|', '!'],
  J: [
    ',_|',
    '_|',
    '._|',
    '._]',
    '_]',
    ',_]',
    '>|',
    '|<',
    '/<',
    '1<',
    '|c',
    '|(',
    '|{',
  ],
  K: ['>|', '|<', '/<', '1<', '|c', '|(', '|{'],
  L: ['1', '£', '7', '|_', '|'],
  M: [
    '/\\/\\',
    '/V\\',
    'JVI',
    '[V]',
    '[]V[]',
    '|\\/|',
    '^^',
    '<\\/>',
    '{V}',
    '(v)',
    '(V)',
    '|V|',
    'nn',
    'IVI',
    '|\\|\\',
    ']\\/[[]',
    '1^1',
    'ITI',
    'JTI',
  ],
  N: ['^', '|\\|', '/\\/', '[\\]', '<\\>', '{\\}', '|V', '/V', 'И', '^', 'ท'],
  O: ['0', '()', 'oh', '[]', '<>', 'Ø', '|°', '|7'],
  P: ['|*', '|o', '|º', '?', '|^', '|>', '|"', '9', '[]D', '|°', '|7'],
  Q: ['(_,)', '2', '0_', '<|', '&'],
  R: [
    'I2',
    '`/',
    '|~',
    '|?',
    '/2',
    '|^',
    'lz',
    '|9',
    '2',
    '12',
    '®',
    '[z',
    'Я',
    '.-',
    '|2',
    '|-',
  ],
  S: ['5', '$', 'z', '§', 'ehs', 'es', '2', '2T'],
  T: ['7', '+', '-|-', '\\/', '†'],
  U: ['(_)', '|_|', 'v', 'L|', 'µ', 'บ'],
  V: ['\\/', '|/', '\\|'],
  W: [
    '\\/\\/',
    'VV',
    '\\N',
    '\\^/',
    '(n)',
    '\\V/',
    '\\X/',
    '\\|/',
    '\\_|_',
    '\\:_:',
    'Ш',
    'Щ',
    'uu',
    '2u',
    'พ',
    'v²',
  ],
  X: ['><', 'Ж', '}{', 'ecks', '×', '?', ')(', ']['],
  Y: ['j', '`/', 'Ч', '7', '\\|/', '¥', '\\/'],
  Z: ['2', '7_', '/-\\', '%', '>_', 's', '~/_', '-\\_', '-|_'],
};

const code = process.argv[2];

const prefix = 'CODE-';

// Codificar mensaje
if (code && code.startsWith(prefix)) {
  const message = code.substring(prefix.length);
  const encoded = encodeLeetSpeak(message);
  console.log(`El codigo es ${encoded}`);
  process.exit();
}

const decoded = decodeOrSkip(code);
console.log(decoded);

function decodeOrSkip(code) {
  const examples = ['|-|()|_/', 'I+I<>7aye', '</-/(Lv', '#014'];
  if (code) {
    console.log(`Codigo encontrado: ${code}`);
    return decodeLeetSpeak(code);
  }
  console.log(`Mensaje no encontrado. Se cargarán los ejemplos.`);
  return decodeLeetSpeak(examples);
}

function decodeLeetSpeak(input) {
  const leetMap = {};

  for (const [key, value] of Object.entries(LEET_ALPHABET)) {
    for (const letter of value) {
      if (!leetMap[letter]) {
        leetMap[letter] = key;
      }
    }
  }

  const decodedArr = [];
  const arr = typeof input === 'string' ? [input] : input;

  for (let i = 0; i < arr.length; i++) {
    let decoded = '';
    let j = 0;
    while (j < arr[i].length) {
      let longestMatch = '';
      for (let k = j; k < arr[i].length; k++) {
        let subStr = arr[i].substring(j, k + 1);
        if (leetMap[subStr] !== undefined) {
          longestMatch = subStr;
        }
      }
      if (longestMatch) {
        decoded += leetMap[longestMatch];
        j += longestMatch.length;
      } else {
        decoded += arr[i][j];
        j++;
      }
    }
    decodedArr.push(decoded);
  }
  //console.log(leetMap);
  return decodedArr.length === 1 ? decodedArr[0] : decodedArr;
}

function encodeLeetSpeak(input) {
  const leetMap = {};

  for (const [key, value] of Object.entries(LEET_ALPHABET)) {
    for (const letter of value) {
      leetMap[key] = value[0];
    }
  }

  const encodedArr = [];
  const arr = typeof input === 'string' ? [input] : input;

  for (let i = 0; i < arr.length; i++) {
    let encoded = '';
    for (let j = 0; j < arr[i].length; j++) {
      const char = arr[i][j].toUpperCase();
      encoded += leetMap[char] || char;
    }
    encodedArr.push(encoded);
  }

  return encodedArr.length === 1 ? encodedArr[0] : encodedArr;
}
