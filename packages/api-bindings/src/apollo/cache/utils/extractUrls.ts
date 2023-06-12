import { Url } from '@lens-protocol/shared-kernel';

export function extractUrls(input: string): Url[] {
  const urlRegex = /(\w+:\/\/[^\s]+)/gi;
  const urls = input.match(urlRegex) || [];
  return urls;
}
