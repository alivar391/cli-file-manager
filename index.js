// npm run start -- --username=Alivar391
import { getUserName } from './src/getUserName.js';
import { argv } from 'process';
import * as fs from 'fs';
import * as path from 'path';
import { listFiles } from './src/ls.js';

const userName = getUserName(argv);
let currentDirectory = getHomedir();
process.stdout.write(`Welcome to the File Manager, ${userName}!\r\n\r\n`);
printCurrentDirectory(getHomedir());
process.stdin.on('data', async (chunk) => {
  const [command, newPath] = chunk.toString().trim().split(' ');
  // console.log(command, newPath);
  if (command === '.exit') {
    process.stdout.write(`Thank you for using File Manager, ${userName}!`);
    process.exit(0);
  }
  if (command === 'ls') {
    listFiles(currentDirectory);
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
  process.stdout.write(`You are currently in ${directory}\r\n`);
}