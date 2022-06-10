// npm run start -- --username=Alivar391
import { getUserName } from './src/getUserName.js';
import { argv } from 'process';
import { chdir, cwd } from 'process';
import { homedir } from 'os';
import { listFiles } from './src/navigate/ls.js';
import { up } from './src/navigate/up.js';
import { cd } from './src/navigate/cd.js';
import { cat } from './src/fs/cat.js';
import { add } from './src/fs/add.js';
import { rn } from './src/fs/rn.js';
import { operationSystem } from './src/os/os.js';
import { hash } from './src/hash/hash.js';

const userName = getUserName(argv);
const homeDir = `${homedir()}`;

console.log(`Welcome to the File Manager, ${userName}!`);

try {
  chdir(`${homeDir}`);
  console.log(`You are currently in ${cwd()}\\`);
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
  if (command === 'rn') {
    rn(newPath);
  }
  if (command === 'os') {
    operationSystem(newPath);
  }
  if (command === 'hash') {
    hash(newPath);
  }
})
process.on('SIGINT', () => {
  process.stdout.write(`Thank you for using File Manager, ${userName}!`);
  process.exit(0);
})
function printCurrentDirectory (directory) {
  process.stdout.write(`You are currently in ${directory}\\\r\n`);
}