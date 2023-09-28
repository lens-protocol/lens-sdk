import { LensConfig } from '../consts/config';
import { ProfileStatsArg, ProfileStatsCountOpenActionArgs } from '../graphql/types.generated';

export type ProfileQueryOptions = {
  profileStatsArg?: ProfileStatsArg;
  profileStatsCountOpenActionArgs?: ProfileStatsCountOpenActionArgs;
};

export function buildProfileQueryOptions(args: {
  config: LensConfig;
  profileStatsArg?: ProfileStatsArg;
  profileStatsCountOpenActionArgs?: ProfileStatsCountOpenActionArgs;
}): ProfileQueryOptions {
  return {
    profileStatsArg: args.profileStatsArg ?? { forApps: args.config.forApps },
    profileStatsCountOpenActionArgs: args.profileStatsCountOpenActionArgs ?? {
      anyOf: [],
    },
  };
}
