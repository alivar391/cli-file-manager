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
    const stats = await fs.stat(pathToFile);
    if (!path.isAbsolute(newFileName) && stats.isFile()) {
      const arr = pathToFile.split('\\');
      arr.splice(arr.length - 1);
      const pathToFolder = arr.join('\\');
      await fs.rename(pathToFile, path.join(pathToFolder, newFileName));
      console.log('File renamed successfully!');
    } else {
      console.log('Operation failed');
    }
  } catch (err) {
    console.log('Operation failed');
  } finally {
    console.log(`You are currently in ${cwd()}\\`);
  }
};