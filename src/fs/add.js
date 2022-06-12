import * as path from 'path';
import * as fs from 'fs/promises';
import { cwd } from 'process';

export const add = async (fileName) => {
  try {
    let newPath;
    if (path.isAbsolute(fileName)) {
      newPath = path.resolve(cwd(), fileName);
    } else {
      newPath = path.join(cwd(), fileName);
    }
    await fs.writeFile(newPath, '', { flag: 'wx' });
    console.log('Empty file created successfully');
  } catch (err) {
    console.log('Operation failed');
  } finally {
    console.log(`You are currently in ${cwd()}\\`);
  }
};
