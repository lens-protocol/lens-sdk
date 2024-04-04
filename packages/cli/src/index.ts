#!/usr/bin/env node

import { program } from '@commander-js/extra-typings';

import { createTestProfile } from './commands/createTestProfile.js';
import './utils/logger.js';

program.name('lens').description('Lens CLI');

program
  .command('development')
  .alias('dev')
  .description('Command will run in the development environment')
  .addCommand(createTestProfile);

program
  .command('production')
  .alias('prod')
  .description('Command will run in the production environment');

program.parse();
