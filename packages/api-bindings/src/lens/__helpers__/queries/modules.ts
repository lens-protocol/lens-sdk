import { ModuleMetadataDocument, ModuleMetadataResult } from '../../graphql/generated';

export function mockModuleMetadataResponse({
  implementation,
  result,
}: {
  implementation: string;
  result: ModuleMetadataResult | null;
}) {
  return {
    request: {
      query: ModuleMetadataDocument,
      variables: {
        request: { implementation },
      },
    },
    result: {
      data: { result },
    },
  };
}
