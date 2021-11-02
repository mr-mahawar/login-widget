export type ShadowRootMode = 'open' | 'closed';

export interface ShadowRootInit {
  mode: ShadowRootMode;
  delegatesFocus?: boolean;
}
