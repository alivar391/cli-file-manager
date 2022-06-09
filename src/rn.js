import * as path from 'path';
import * as fs from 'fs/promises';
import { cwd } from 'process';

export const rn = async (args) => {
  const [fileName, newFileName] = args.split(' ');
  try {
    let pathToFile;
    if (path.isAbsolute(fileName)) {
      pathToFile = path.resolve(cwd(), fileName);
    } else {
      pathToFile = path.join(cwd(), fileName);
    }
    console.log(pathToFile, path.join(pathToFile, newFileName))
    if (!path.isAbsolute(newFileName)) {
      await fs.rename(pathToFile, path.join(cwd(), newFileName));
    } else {
      console.log('Operation failed');
    }
  } catch (err) {
    console.log('Operation failed');
  }
};