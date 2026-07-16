import Image, { type ImageProps } from 'next/image';
import { resolveImageUrl } from '@/lib/resolveImageUrl';

type CmsImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
  fallback?: string;
};

export default function CmsImage({ src, fallback = '/images/about/portrait.jpg', alt, ...props }: CmsImageProps) {
  const resolved = resolveImageUrl(src) || fallback;

  return <Image src={resolved} alt={alt} {...props} />;
}
