import * as path from 'path';
import { chdir, cwd } from 'process';

export const up = () => {
  try {
    chdir('../');
  } catch (err) {
    console.error('Operation failed');
  } finally {
    console.log(`You are currently in ${cwd()}\\`);
  }
}