// Heavily customized and simplified version of https://www.npmjs.com/package/zod-validation-error
import { hasAtLeastOne, hasTwoOrMore, NonEmptyArray } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

const maxIssuesInMessage = 99;
const issueSeparator = '\n';
const bulletPoint = '· ';

function escapeQuotes(str: string): string {
  return str.replace(/"/g, '\\"');
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#identifiers
 */
const identifierRegex = /[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*/u;

function formatPath(path: NonEmptyArray<string | number>): string {
  if (path.length === 1) {
    return path[0].toString();
  }

  return path.reduce<string>((acc, item) => {
    // handle numeric indices
    if (typeof item === 'number') {
      return acc + '[' + item.toString() + ']';
    }

    // handle quoted values
    if (item.includes('"')) {
      return acc + '["' + escapeQuotes(item) + '"]';
    }

    // handle special characters
    if (!identifierRegex.test(item)) {
      return acc + '["' + item + '"]';
    }

    // handle normal values
    const separator = acc.length === 0 ? '' : '.';
    return acc + separator + item;
  }, '');
}

function formatZodInvalidUnionIssue(issue: z.ZodInvalidUnionIssue): string {
  const groups = issue.unionErrors.map<string[]>((zodError) =>
    zodError.issues.map((nested) => {
      if (hasAtLeastOne(nested.path)) {
        return `"${formatPath(nested.path)}": ${nested.message}`;
      }
      return nested.message;
    }),
  );

  const uniqueGroups = [...new Set(groups.map((group) => group.join('; ')))];

  const path = Array.isArray(issue.path) ? issue.path : [issue.path];
  const prefix = hasAtLeastOne(path) ? `"${formatPath(path)}": ` : '';

  if (hasTwoOrMore(uniqueGroups)) {
    return (
      `${bulletPoint}${prefix}expected to match one of the following groups:\n` +
      `\t\t${uniqueGroups.join(`${issueSeparator}\tOR:${issueSeparator}\t\t`)}`
    );
  }

  return `${bulletPoint}${prefix}${uniqueGroups[0]}`;
}

function formatZodIssue(issue: z.ZodIssue): string {
  if (issue.code === z.ZodIssueCode.invalid_union) {
    return formatZodInvalidUnionIssue(issue);
  }

  if (hasAtLeastOne(issue.path)) {
    return `${bulletPoint}"${formatPath(issue.path)}": ${issue.message}`;
  }

  return issue.message;
}

/**
 * Formats a Zod parsing error into a human-readable string.
 *
 * The formatting is tailored to the Lens Protocol Metadata use case. It may not be suitable for other use cases.
 *
 * @category Helpers
 *
 * @example
 * ```ts
 * const result = PublicationMetadataSchema.safeParse(invalid);
 *
 * if (!result.success) {
 *   throw new Error(formatZodError(result.error));
 * }
 * ```
 */
export function formatZodError(zodError: z.ZodError): string {
  const reason = zodError.errors
    // limit max number of issues printed in the reason section
    .slice(0, maxIssuesInMessage)
    // format error message
    .map((issue) => formatZodIssue(issue))
    // concat as string
    .join(issueSeparator);

  if (reason.length === 0) {
    return (
      'invalid argument, it was not possible to determine a more detailed reason.\n' +
      'Check the input you provided and try again.'
    );
  }

  return `fix the following issues\n${reason}`;
}
