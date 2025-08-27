import type { ImgHTMLAttributes } from 'react';

export interface TestImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  fill?: boolean;
}
