import * as os from 'os';
import { cwd } from 'process';

export const operationSystem = (args) => {
  if (args.startsWith('--') && !args.includes(' ')) {
    const command = args.slice(2);
    try {
      if (command === 'EOL') {
        console.log(JSON.stringify(`Default system End-Of-Line is ${os.EOL}`));
      }
      if (command === 'cpus') {
        const cpus = os.cpus();
        console.log(`Overall amount of CPUS is ${cpus.length}`);
        const arr = [];
        for (const cpu of cpus) {
          arr.push({ model: cpu.model, clock_rate: `${(cpu.speed) / 1000} GHz`});
        }
        console.table(arr);
      }
      if (command === 'homedir') {
        console.log(`Home director is ${os.homedir()}`);
      }
      if (command === 'username') {
        console.log(`System user name is ${os.userInfo().username}`);
      }
      if (command === 'architecture') {
        console.log(`CPU architecture is ${os.arch()}`);
      }
    } catch (err) {
      console.error('Operation failed');
    } finally {
      console.log(`You are currently in ${cwd()}\\`);
    }
  } else {
    console.log('Operation failed');
    console.log(`You are currently in ${cwd()}\\`);
  }
}