const originalFetch = globalThis.fetch;

// Necessary due to a too-strict happy-dom interpretation of which
// authentication headers are allowed. It should have allowed `Authorization: Bearer ...`.
// https://github.com/capricorn86/happy-dom/blob/b61762e732872651af11f0c07c12a90850ac830f/packages/happy-dom/src/fetch/utilities/FetchRequestHeaderUtility.ts#L94
globalThis.fetch = async (input, init = {}) => {
  const patchedInit = {
    ...init,
    credentials: 'include',
  } as const;

  return originalFetch(input, patchedInit);
};
