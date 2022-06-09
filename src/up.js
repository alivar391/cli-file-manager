import * as path from 'path';
import { chdir, cwd } from 'process';

export const up = () => {
  try {
    chdir('../');
    console.log(`${cwd()}\\`);
  } catch (err) {
    console.error('Operation failed');
  }
}