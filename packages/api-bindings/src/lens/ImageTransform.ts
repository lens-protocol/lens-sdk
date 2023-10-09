export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Percentage = `100%` | `${Digit}${Digit}%` | `${Digit}%`;

export type Pixel =
  | `${Digit}${Digit}${Digit}${Digit}px`
  | `${Digit}${Digit}${Digit}px`
  | `${Digit}${Digit}px`;

export type ImageSizeTransform = Pixel | Percentage | 'auto';

export type ImageTransform = {
  /**
   * Set the transformed image's width. You can use specific size in
   * pixels eg. 100px, a percentage eg. 50% or set as 'auto' to be set automatically.
   *
   * @defaultValue 'auto'
   */
  width?: ImageSizeTransform;
  /**
   * Set the transformed image's height. You can use specific size in
   * pixels eg. 100px, a percentage eg. 50% or set as 'auto' to be set automatically.
   *
   * @defaultValue 'auto'
   */
  height?: ImageSizeTransform;
  /**
   * Set if you want to keep the image's original aspect ratio.
   * If explicitly set to false, the image will stretch based on the width and height values.
   *
   * @defaultValue true
   */
  keepAspectRatio?: boolean;
};
