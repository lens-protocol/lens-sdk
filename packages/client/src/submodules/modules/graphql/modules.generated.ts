// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  NetworkAddressFragment,
  Erc20Fragment,
  PaginatedResultInfoFragment,
  ImageFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  NetworkAddressFragmentDoc,
  Erc20FragmentDoc,
  PaginatedResultInfoFragmentDoc,
  ImageFragmentDoc,
} from '../../../graphql/fragments.generated';
export type ModuleInfoFragment = { name: string; type: string };

export type KnownSupportedModuleFragment = {
  moduleName: string;
  contract: NetworkAddressFragment;
  moduleInput: Array<ModuleInfoFragment>;
  redeemInput: Array<ModuleInfoFragment>;
  returnDataInput: Array<ModuleInfoFragment>;
};

export type UnknownSupportedModuleFragment = {
  moduleName: string;
  contract: NetworkAddressFragment;
};

export type ApprovedAllowanceAmountResultFragment = {
  moduleName: string;
  allowance: string;
  moduleContract: NetworkAddressFragment;
};

export type GenerateModuleCurrencyApprovalResultFragment = {
  to: string;
  from: string;
  data: string;
};

export type CurrenciesQueryVariables = Types.Exact<{
  request: Types.PaginatedOffsetRequest;
}>;

export type CurrenciesQuery = {
  result: { items: Array<Erc20Fragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ApprovedModuleAllowanceAmountQueryVariables = Types.Exact<{
  request: Types.ApprovedModuleAllowanceAmountRequest;
}>;

export type ApprovedModuleAllowanceAmountQuery = {
  result: Array<ApprovedAllowanceAmountResultFragment>;
};

export type GenerateModuleCurrencyApprovalDataQueryVariables = Types.Exact<{
  request: Types.GenerateModuleCurrencyApprovalDataRequest;
}>;

export type GenerateModuleCurrencyApprovalDataQuery = {
  result: GenerateModuleCurrencyApprovalResultFragment;
};

export type SupportedFollowModulesQueryVariables = Types.Exact<{
  request: Types.SupportedModulesRequest;
}>;

export type SupportedFollowModulesQuery = {
  result: {
    items: Array<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export type SupportedReferenceModulesQueryVariables = Types.Exact<{
  request: Types.SupportedModulesRequest;
}>;

export type SupportedReferenceModulesQuery = {
  result: {
    items: Array<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export type SupportedOpenActionModulesQueryVariables = Types.Exact<{
  request: Types.SupportedModulesRequest;
}>;

export type SupportedOpenActionModulesQuery = {
  result: {
    items: Array<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export type SupportedOpenActionCollectModulesQueryVariables = Types.Exact<{
  request: Types.SupportedModulesRequest;
}>;

export type SupportedOpenActionCollectModulesQuery = {
  result: {
    items: Array<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export const ModuleInfoFragmentDoc = gql`
  fragment ModuleInfo on ModuleInfo {
    name
    type
  }
`;
export const KnownSupportedModuleFragmentDoc = gql`
  fragment KnownSupportedModule on KnownSupportedModule {
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
  }
  ${NetworkAddressFragmentDoc}
  ${ModuleInfoFragmentDoc}
`;
export const UnknownSupportedModuleFragmentDoc = gql`
  fragment UnknownSupportedModule on UnknownSupportedModule {
    moduleName
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const ApprovedAllowanceAmountResultFragmentDoc = gql`
  fragment ApprovedAllowanceAmountResult on ApprovedAllowanceAmountResult {
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
export const CurrenciesDocument = gql`
  query Currencies($request: PaginatedOffsetRequest!) {
    result: currencies(request: $request) {
      items {
        ...Erc20
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${Erc20FragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
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
export const SupportedFollowModulesDocument = gql`
  query SupportedFollowModules($request: SupportedModulesRequest!) {
    result: supportedFollowModules(request: $request) {
      items {
        ... on KnownSupportedModule {
          ...KnownSupportedModule
        }
        ... on UnknownSupportedModule {
          ...UnknownSupportedModule
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${KnownSupportedModuleFragmentDoc}
  ${UnknownSupportedModuleFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const SupportedReferenceModulesDocument = gql`
  query SupportedReferenceModules($request: SupportedModulesRequest!) {
    result: supportedReferenceModules(request: $request) {
      items {
        ... on KnownSupportedModule {
          ...KnownSupportedModule
        }
        ... on UnknownSupportedModule {
          ...UnknownSupportedModule
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${KnownSupportedModuleFragmentDoc}
  ${UnknownSupportedModuleFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const SupportedOpenActionModulesDocument = gql`
  query SupportedOpenActionModules($request: SupportedModulesRequest!) {
    result: supportedOpenActionModules(request: $request) {
      items {
        ... on KnownSupportedModule {
          ...KnownSupportedModule
        }
        ... on UnknownSupportedModule {
          ...UnknownSupportedModule
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${KnownSupportedModuleFragmentDoc}
  ${UnknownSupportedModuleFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const SupportedOpenActionCollectModulesDocument = gql`
  query SupportedOpenActionCollectModules($request: SupportedModulesRequest!) {
    result: supportedOpenActionCollectModules(request: $request) {
      items {
        ... on KnownSupportedModule {
          ...KnownSupportedModule
        }
        ... on UnknownSupportedModule {
          ...UnknownSupportedModule
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${KnownSupportedModuleFragmentDoc}
  ${UnknownSupportedModuleFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const CurrenciesDocumentString = print(CurrenciesDocument);
const ApprovedModuleAllowanceAmountDocumentString = print(ApprovedModuleAllowanceAmountDocument);
const GenerateModuleCurrencyApprovalDataDocumentString = print(
  GenerateModuleCurrencyApprovalDataDocument,
);
const SupportedFollowModulesDocumentString = print(SupportedFollowModulesDocument);
const SupportedReferenceModulesDocumentString = print(SupportedReferenceModulesDocument);
const SupportedOpenActionModulesDocumentString = print(SupportedOpenActionModulesDocument);
const SupportedOpenActionCollectModulesDocumentString = print(
  SupportedOpenActionCollectModulesDocument,
);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Currencies(
      variables: CurrenciesQueryVariables,
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
    SupportedFollowModules(
      variables: SupportedFollowModulesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SupportedFollowModulesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SupportedFollowModulesQuery>(
            SupportedFollowModulesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'SupportedFollowModules',
        'query',
      );
    },
    SupportedReferenceModules(
      variables: SupportedReferenceModulesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SupportedReferenceModulesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SupportedReferenceModulesQuery>(
            SupportedReferenceModulesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'SupportedReferenceModules',
        'query',
      );
    },
    SupportedOpenActionModules(
      variables: SupportedOpenActionModulesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SupportedOpenActionModulesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SupportedOpenActionModulesQuery>(
            SupportedOpenActionModulesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'SupportedOpenActionModules',
        'query',
      );
    },
    SupportedOpenActionCollectModules(
      variables: SupportedOpenActionCollectModulesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SupportedOpenActionCollectModulesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SupportedOpenActionCollectModulesQuery>(
            SupportedOpenActionCollectModulesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'SupportedOpenActionCollectModules',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
