import { IConversationProvider } from './adapters/IConversationProvider';

/**
 * Configuration for inbox feature
 */
export type InboxConfig = {
  provider: IConversationProvider;
};
