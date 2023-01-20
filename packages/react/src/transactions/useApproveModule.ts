import { TokenAllowanceRequest } from "@lens-protocol/domain/dist/use-cases/wallets";
import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { useState } from "react";

import { useApproveModuleController } from "./adapters/useApproveModuleController";

export function useApproveModule() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<
  | InsufficientGasError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | null
  >(null)
  const setAllowance = useApproveModuleController()

  return {
    setAllowance: async (request: TokenAllowanceRequest) => {
      setIsPending(true);
      setError(null)
      const result = await setAllowance(request)
      if(result.isFailure()) {
        setError(result.error)
      }
      setIsPending(false)
    },
    error,
    isPending
  }

}