/**
 * The secondary `/inbox` entrypoint provides a set of hooks to help integrate XMTP SDK features with the Lens SDK.
 * The hooks are intended to be used together with hooks provided by `@xmtp/react-sdk` package.
 * You can find more in their [GitHub repository](https://github.com/xmtp/xmtp-web/tree/main/packages/react-sdk)
 *
 * ### Usage
 *
 * Wrap your app with LensProvider, together with the XMTPProvider, as described in their docs.
 *
 * ```tsx
 * import { XMTPProvider } from "@xmtp/react-sdk";
 *
 * function App() {
 *   return (
 *     <WagmiConfig config={config}>
 *       <LensProvider config={lensConfig}>
 *         <XMTPProvider>
 *           <YourRoutes />
 *         </XMTPProvider>
 *       </LensProvider>
 *     </WagmiConfig>
 *   );
 * }
 * ```
 *
 * Now you can use all the hooks from `@xmtp/react-sdk` package as well as from this folder.
 *
 * You import them like this:
 * ```tsx
 * import { useConversations } from '@xmtp/react-sdk';
 * import { useXmtpClient, useEnhanceConversations } from '@lens-protocol/react-web/inbox';
 * ```
 * @module Inbox
 */

export * from './types';
export * from './useEnhanceConversation';
export * from './useEnhanceConversations';
export * from './useStartLensConversation';
export * from './useXmtpClient';
