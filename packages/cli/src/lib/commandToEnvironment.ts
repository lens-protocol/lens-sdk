import type { Command } from '@commander-js/extra-typings';
import { LensClient, production, development } from '@lens-protocol/client';

const commandToEnvironmentMap = {
  production: production,
  development: development,
};

type EnvCommandName = keyof typeof commandToEnvironmentMap;

export function ensureParentCommand(cmd: Command): EnvCommandName {
  if (!cmd.parent) {
    throw new Error('Parent command not found');
  }

  const name = cmd.parent.name();

  if (!(name in commandToEnvironmentMap)) {
    throw new Error(`Invalid parent command name: ${name}`);
  }

  return name as EnvCommandName;
}

export function initLensClient(name: EnvCommandName) {
  return new LensClient({
    environment: commandToEnvironmentMap[name],
  });
}
