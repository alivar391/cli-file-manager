import * as path from 'path';
import { chdir, cwd } from 'process';

export const cd = async (newPath) => {
  try {
    if (path.isAbsolute(newPath)) {
      chdir(path.resolve(cwd(), newPath));
    } else {
      chdir(path.join(cwd(), newPath));
    }
  }
  catch (err) {
    console.log('Operation failed');
  } finally {
    console.log(`You are currently in ${cwd()}\\`);
  }
}
