import { sharedKernel } from "@lens-protocol/shared-kernel";

export type UseHookResponse = {
  message: string;
  success: boolean;
};

export function useHook(): UseHookResponse {
  const response = sharedKernel();
  return {
    message: `react & ${response}`,
    success: true,
  };
}
