// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  NetworkAddressFragment,
  Erc20Fragment,
  PaginatedResultInfoFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  NetworkAddressFragmentDoc,
  Erc20FragmentDoc,
  PaginatedResultInfoFragmentDoc,
} from '../../../graphql/fragments.generated';
export type ModuleInfoFragment = { name: string; type: string };

export type SupportedModuleFragment = {
  moduleName: string;
  isTypeSafe: boolean;
  contract: NetworkAddressFragment;
  moduleInput: Array<ModuleInfoFragment>;
  redeemInput: Array<ModuleInfoFragment>;
  returnDataInput: Array<ModuleInfoFragment>;
};

export type SupportedModulesFragment = {
  openActionsModules: Array<SupportedModuleFragment>;
  followModules: Array<SupportedModuleFragment>;
  referenceModules: Array<SupportedModuleFragment>;
};

export type ApprovedAllowanceAmountResultFragment = {
  currency: string;
  moduleName: string;
  allowance: string;
  moduleContract: NetworkAddressFragment;
};

export type GenerateModuleCurrencyApprovalResultFragment = {
  to: string;
  from: string;
  data: string;
};

export type SupportedModulesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SupportedModulesQuery = { result: Array<SupportedModulesFragment> };

export type CurrenciesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CurrenciesQuery = { result: Array<Erc20Fragment> };

export type ApprovedModuleAllowanceAmountQueryVariables = Types.Exact<{
  request: Types.ApprovedModuleAllowanceAmountRequest;
}>;

export type ApprovedModuleAllowanceAmountQuery = { result: ApprovedAllowanceAmountResultFragment };

export type GenerateModuleCurrencyApprovalDataQueryVariables = Types.Exact<{
  request: Types.GenerateModuleCurrencyApprovalDataRequest;
}>;

export type GenerateModuleCurrencyApprovalDataQuery = {
  result: GenerateModuleCurrencyApprovalResultFragment;
};

export const ModuleInfoFragmentDoc = gql`
  fragment ModuleInfo on ModuleInfo {
    name
    type
  }
`;
export const SupportedModuleFragmentDoc = gql`
  fragment SupportedModule on SupportedModule {
    moduleName
    contract {
      ...NetworkAddress
    }
    moduleInput {
      ...ModuleInfo
    }
    redeemInput {
      ...ModuleInfo
    }
    returnDataInput {
      ...ModuleInfo
    }
    isTypeSafe
  }
  ${NetworkAddressFragmentDoc}
  ${ModuleInfoFragmentDoc}
`;
export const SupportedModulesFragmentDoc = gql`
  fragment SupportedModules on SupportedModules {
    openActionsModules {
      ...SupportedModule
    }
    followModules {
      ...SupportedModule
    }
    referenceModules {
      ...SupportedModule
    }
  }
  ${SupportedModuleFragmentDoc}
`;
export const ApprovedAllowanceAmountResultFragmentDoc = gql`
  fragment ApprovedAllowanceAmountResult on ApprovedAllowanceAmountResult {
    currency
    moduleName
    moduleContract {
      ...NetworkAddress
    }
    allowance
  }
  ${NetworkAddressFragmentDoc}
`;
export const GenerateModuleCurrencyApprovalResultFragmentDoc = gql`
  fragment GenerateModuleCurrencyApprovalResult on GenerateModuleCurrencyApprovalResult {
    to
    from
    data
  }
`;
export const SupportedModulesDocument = gql`
  query SupportedModules {
    result: supportedModules {
      ...SupportedModules
    }
  }
  ${SupportedModulesFragmentDoc}
`;
export const CurrenciesDocument = gql`
  query Currencies {
    result: currencies {
      ...Erc20
    }
  }
  ${Erc20FragmentDoc}
`;
export const ApprovedModuleAllowanceAmountDocument = gql`
  query ApprovedModuleAllowanceAmount($request: ApprovedModuleAllowanceAmountRequest!) {
    result: approvedModuleAllowanceAmount(request: $request) {
      ... on ApprovedAllowanceAmountResult {
        ...ApprovedAllowanceAmountResult
      }
    }
  }
  ${ApprovedAllowanceAmountResultFragmentDoc}
`;
export const GenerateModuleCurrencyApprovalDataDocument = gql`
  query GenerateModuleCurrencyApprovalData($request: GenerateModuleCurrencyApprovalDataRequest!) {
    result: generateModuleCurrencyApprovalData(request: $request) {
      ... on GenerateModuleCurrencyApprovalResult {
        ...GenerateModuleCurrencyApprovalResult
      }
    }
  }
  ${GenerateModuleCurrencyApprovalResultFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const SupportedModulesDocumentString = print(SupportedModulesDocument);
const CurrenciesDocumentString = print(CurrenciesDocument);
const ApprovedModuleAllowanceAmountDocumentString = print(ApprovedModuleAllowanceAmountDocument);
const GenerateModuleCurrencyApprovalDataDocumentString = print(
  GenerateModuleCurrencyApprovalDataDocument,
);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    SupportedModules(
      variables?: SupportedModulesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SupportedModulesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SupportedModulesQuery>(SupportedModulesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SupportedModules',
        'query',
      );
    },
    Currencies(
      variables?: CurrenciesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: CurrenciesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CurrenciesQuery>(CurrenciesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Currencies',
        'query',
      );
    },
    ApprovedModuleAllowanceAmount(
      variables: ApprovedModuleAllowanceAmountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ApprovedModuleAllowanceAmountQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ApprovedModuleAllowanceAmountQuery>(
            ApprovedModuleAllowanceAmountDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ApprovedModuleAllowanceAmount',
        'query',
      );
    },
    GenerateModuleCurrencyApprovalData(
      variables: GenerateModuleCurrencyApprovalDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: GenerateModuleCurrencyApprovalDataQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GenerateModuleCurrencyApprovalDataQuery>(
            GenerateModuleCurrencyApprovalDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GenerateModuleCurrencyApprovalData',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
