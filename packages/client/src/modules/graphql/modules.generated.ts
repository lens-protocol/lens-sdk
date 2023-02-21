// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import { Erc20Fragment } from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { Erc20FragmentDoc } from '../../graphql/fragments.generated';
export type ModuleInfoFragment = { __typename: 'ModuleInfo'; name: string; type: string };

export type EnabledModuleFragment = {
  __typename: 'EnabledModule';
  moduleName: string;
  contractAddress: string;
  inputParams: Array<ModuleInfoFragment>;
  redeemParams: Array<ModuleInfoFragment>;
  returnDataParams: Array<ModuleInfoFragment>;
};

export type EnabledModulesFragment = {
  __typename: 'EnabledModules';
  collectModules: Array<EnabledModuleFragment>;
  followModules: Array<EnabledModuleFragment>;
  referenceModules: Array<EnabledModuleFragment>;
};

export type EnabledModulesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type EnabledModulesQuery = { result: EnabledModulesFragment };

export type EnabledModuleCurrenciesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type EnabledModuleCurrenciesQuery = { result: Array<Erc20Fragment> };

export type ApprovedModuleAllowanceAmountQueryVariables = Types.Exact<{
  request: Types.ApprovedModuleAllowanceAmountRequest;
}>;

export type ApprovedModuleAllowanceAmountQuery = {
  result: Array<{ currency: string; module: string; contractAddress: string; allowance: string }>;
};

export type GenerateModuleCurrencyApprovalDataQueryVariables = Types.Exact<{
  request: Types.GenerateModuleCurrencyApprovalDataRequest;
}>;

export type GenerateModuleCurrencyApprovalDataQuery = {
  result: { to: string; from: string; data: string };
};

export const ModuleInfoFragmentDoc = gql`
  fragment ModuleInfo on ModuleInfo {
    __typename
    name
    type
  }
`;
export const EnabledModuleFragmentDoc = gql`
  fragment EnabledModule on EnabledModule {
    __typename
    moduleName
    contractAddress
    inputParams {
      ...ModuleInfo
    }
    redeemParams {
      ...ModuleInfo
    }
    returnDataParams: returnDataParms {
      ...ModuleInfo
    }
  }
  ${ModuleInfoFragmentDoc}
`;
export const EnabledModulesFragmentDoc = gql`
  fragment EnabledModules on EnabledModules {
    __typename
    collectModules {
      ...EnabledModule
    }
    followModules {
      ...EnabledModule
    }
    referenceModules {
      ...EnabledModule
    }
  }
  ${EnabledModuleFragmentDoc}
`;
export const EnabledModulesDocument = gql`
  query EnabledModules {
    result: enabledModules {
      ...EnabledModules
    }
  }
  ${EnabledModulesFragmentDoc}
`;
export const EnabledModuleCurrenciesDocument = gql`
  query EnabledModuleCurrencies {
    result: enabledModuleCurrencies {
      ...Erc20
    }
  }
  ${Erc20FragmentDoc}
`;
export const ApprovedModuleAllowanceAmountDocument = gql`
  query ApprovedModuleAllowanceAmount($request: ApprovedModuleAllowanceAmountRequest!) {
    result: approvedModuleAllowanceAmount(request: $request) {
      currency
      module
      contractAddress
      allowance
    }
  }
`;
export const GenerateModuleCurrencyApprovalDataDocument = gql`
  query GenerateModuleCurrencyApprovalData($request: GenerateModuleCurrencyApprovalDataRequest!) {
    result: generateModuleCurrencyApprovalData(request: $request) {
      to
      from
      data
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const EnabledModulesDocumentString = print(EnabledModulesDocument);
const EnabledModuleCurrenciesDocumentString = print(EnabledModuleCurrenciesDocument);
const ApprovedModuleAllowanceAmountDocumentString = print(ApprovedModuleAllowanceAmountDocument);
const GenerateModuleCurrencyApprovalDataDocumentString = print(
  GenerateModuleCurrencyApprovalDataDocument,
);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    EnabledModules(
      variables?: EnabledModulesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: EnabledModulesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<EnabledModulesQuery>(EnabledModulesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EnabledModules',
        'query',
      );
    },
    EnabledModuleCurrencies(
      variables?: EnabledModuleCurrenciesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: EnabledModuleCurrenciesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<EnabledModuleCurrenciesQuery>(
            EnabledModuleCurrenciesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'EnabledModuleCurrencies',
        'query',
      );
    },
    ApprovedModuleAllowanceAmount(
      variables: ApprovedModuleAllowanceAmountQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
