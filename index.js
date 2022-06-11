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
import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';
import { rm } from './src/fs/rm.js';
import { cp } from './src/fs/cp.js';
import { mv } from './src/fs/mv.js';

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
    return;
  }
  if (command === 'up') {
    up();
    return;
  }
  if (command === 'cd') {
    cd(newPath);
    return;
  }
  if (command === 'cat') {
    cat(newPath);
    return;
  }
  if (command === 'add') {
    add(newPath);
    return;
  }
  if (command === 'rn') {
    rn(newPath);
    return;
  }
  if (command === 'rm') {
    rm(newPath);
    return;
  }
  if (command === 'cp') {
    cp(newPath);
    return;
  }
  if (command === 'mv') {
    mv(newPath);
    return;
  }
  if (command === 'os') {
    operationSystem(newPath);
    return;
  }
  if (command === 'hash') {
    hash(newPath);
    return;
  }
  if (command === 'compress') {
    compress(newPath);
    return;
  }
  if (command === 'decompress') {
    decompress(newPath);
    return;
  } else {
    console.log('Invalid input');
  }
})
process.on('SIGINT', () => {
  process.stdout.write(`Thank you for using File Manager, ${userName}!`);
  process.exit(0);
})
