import Image from 'next/image';
import type { ImageAsset } from './types';

type Props = {
  image: ImageAsset;
  /** 縦横比（Tailwind の aspect クラス） */
  aspect?: string;
  sizes?: string;
  className?: string;
};

/** 節の中に置く写真。外枠の幅まで広げ、角は丸めない。フリー素材は alt に「イメージ」と書く */
export default function Photo({ image, aspect = 'aspect-[16/9] md:aspect-[21/9]', sizes = '(min-width: 1152px) 1072px, 100vw', className = '' }: Props) {
  return (
    <div className={`relative ${aspect} ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
