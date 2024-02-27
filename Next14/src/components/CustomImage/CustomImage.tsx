'use client';

import Image from 'next/image';
import { useState } from 'react';

function CustomImage({
  alt,
  defaultImg,
  src,
  ...props
}: {
  alt: string;
  defaultImg: string;
  src: string;
}) {
  const [srcset, setSrcset] = useState(src);

  return (
    <Image
      {...props}
      src={srcset}
      alt={alt}
      fill
      priority={true}
      quality={100}
      style={{
        objectFit: 'cover',
      }}
      onError={() => setSrcset(defaultImg)}
      placeholder="blur"
      blurDataURL={defaultImg}
    />
  );
}

export default CustomImage;
