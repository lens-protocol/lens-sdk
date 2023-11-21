---
"@lens-protocol/shared-kernel": patch
"@lens-protocol/api-bindings": patch
"@lens-protocol/react": patch
"@lens-protocol/react-web": patch
---

**fix:** fixes silent token-refresh logic so that, if refresh token is still valid, a silent refresh of tokens takes places and failed requests are retried seamlessly
