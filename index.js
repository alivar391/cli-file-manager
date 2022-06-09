// npm run start -- --username=Alivar391
import { getUserName } from './src/getUserName.js';
import { argv } from 'process';
import { chdir, cwd } from 'process';
import { homedir } from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { listFiles } from './src/ls.js';
import { up } from './src/up.js';
import { cd } from './src/cd.js';
import { cat } from './src/cat.js';
import { add } from './src/add.js';

const userName = getUserName(argv);
const homeDir = `${homedir()}`;

console.log(`Welcome to the File Manager, ${userName}!`);
try {
  chdir(`${homeDir}`);
  console.log(cwd());
} catch (err) {
  console.error(`chdir: ${err}`);
}
process.stdin.on('data', async (chunk) => {
  const [command, ...args] = chunk.toString().trim().split(' ');
  const newPath = args.join(' ');
  if (command === '.exit') {
    process.stdout.write(`Thank you for using File Manager, ${userName}!`);
    process.exit(0);
  }
  if (command === 'ls') {
    listFiles();
  }
  if (command === 'up') {
    up();
  }
  if (command === 'cd') {
    await cd(newPath);
  }
  if (command === 'cat') {
    cat(newPath);
  }
  if (command === 'add') {
    add(newPath);
  }
})
process.on('SIGINT', () => {
  process.stdout.write(`Thank you for using File Manager, ${userName}!`);
  process.exit(0);
})
function getHomedir () {
  return process.env.HOME || process.env.USERPROFILE;
}
function printCurrentDirectory (directory) {
  process.stdout.write(`You are currently in ${directory}\\\r\n`);
}