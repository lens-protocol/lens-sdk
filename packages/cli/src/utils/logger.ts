import chalk from 'chalk';

const log = console.log;
const error = console.error;

console.log = (...args: Parameters<typeof console.log>) => {
  log(chalk.green(...args));
};

console.error = (...args: Parameters<typeof console.error>) => {
  error(chalk.red(...args));
};
