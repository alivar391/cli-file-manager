import * as path from 'path';
import * as fs from 'fs/promises';
import { cwd } from 'process';

export const rm = async (fileName) => {
  try {
    let newPath;
    if (path.isAbsolute(fileName)) {
      newPath = path.resolve(cwd(), fileName);
    } else {
      newPath = path.join(cwd(), fileName);
    }
    const statsFile = await fs.stat(newPath);
    if (statsFile.isFile()) {
      await fs.unlink(newPath);
      console.log(`File removed successfully!`);
      console.log(`You are currently in ${cwd()}\\`);
    } else {
      console.log('Operation failed');
      console.log(`You are currently in ${cwd()}\\`);
    }
  } catch {
    console.log('Operation failed');
    console.log(`You are currently in ${cwd()}\\`);
  }
};
