import { ReactNode } from 'react';

/**
 * <LensProvider> props
 */
export type LensProviderProps = {
  /**
   * The children to render
   */
  children: ReactNode;
};

/**
 * Manages the lifecycle and internal state of the Lens SDK
 *
 * @group Components
 * @param props - {@link LensProviderProps}
 */
export function LensProvider({ children, ...props }: LensProviderProps) {
  // eslint-disable-next-line
  console.log('LensProvider', props);

  return children;
}
