import { sharedKernel } from "@lens-protocol/shared-kernel";

export function useHook() {
  const response = sharedKernel();
  return `react & ${response}`;
}
