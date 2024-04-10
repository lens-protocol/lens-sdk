import chalk from 'chalk';

export const output = {
  success: function (...args: Parameters<typeof console.log>) {
    console.log(chalk.green(...args));
  },
  error: function (...args: Parameters<typeof console.log>) {
    console.log(chalk.red(...args));
  },
  info: function (...args: Parameters<typeof console.log>) {
    console.log(...args);
  },
  value: function (key: string, ...args: Parameters<typeof console.log>) {
    console.log(key, chalk.green(...args));
  },
};
