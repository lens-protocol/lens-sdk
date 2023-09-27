export * from './generated';

/**
 * @experimental
 */
export enum SnapshotVotingSystem {
  /**
   * Each user can select only one option.
   *
   * The results will reflect these votes as percentages of the total voting power of all voting participants cast on the specific choice.
   */
  SINGLE_CHOICE = 'single-choice',
  /**
   * Each user can select (approve) any number of choices.
   *
   * Each selected choice will receive equal voting power
   * i.e. if user selects two choices, each choice will receive the total voting power of the user.
   */
  APPROVAL = 'approval',
  /**
   * Each user can spread voting power across any number of choices.
   *
   * The results are calculated quadratically, thanks to which the **number of individual voters** matters more than the sum of voting power contributed.
   */
  QUADRATIC = 'quadratic',
  /**
   * Each user has to rank all choices in a desired order.
   *
   * In the **first step** votes are counted for each voter's number one choice.
   * If a choice receives more than 50% votes (cast on number one choices of each user), that choice wins.
   * The result will show the percentages reflecting how users voted for their **first choice only**.
   *
   * In the **second step** if the first-choice candidate doesn't get over 50% of the total votes the choice with the **fewest** number one votes is **eliminated**.
   * Voters who had chosen the defeated choice as number one now have their number two choice **counted as their number one** choice.
   *
   * The process continues over multiple rounds until a choice has more than half (\> 50%) of the total votes.
   */
  RANKED_CHOICE = 'ranked-choice',
  /**
   * Each user can spread their voting power across any number of choices, from one to all.
   *
   * Their voting power will be divided between their chosen options according to how much
   * weight they attribute to each option by increasing or decreasing the voting power fraction.
   */
  WEIGHTED = 'weighted',
  /**
   * Each user can select one of three options: `For`, `Against`, `Abstain`.
   *
   * The votes cast on the `Abstain` choice are counted in calculating if the necessary quorum has been reached for a proposal to pass.
   */
  BASIC = 'basic',
}
