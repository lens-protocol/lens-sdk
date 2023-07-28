export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Percentage = `100%` | `${Digit}${Digit}%` | `${Digit}%`;

export type Pixel =
  | `${Digit}${Digit}${Digit}${Digit}px`
  | `${Digit}${Digit}${Digit}px`
  | `${Digit}${Digit}px`;

export type ImageSizeTransform = Pixel | Percentage | 'auto';
