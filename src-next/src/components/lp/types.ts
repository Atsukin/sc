import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export type { LucideIcon };

export type BreadcrumbItem = { name: string; path: `/${string}` };

/** 写真。フリー素材を使う場合、alt やキャプションで「施工事例」「当社施工」と書かない */
export type ImageAsset = { src: string; alt: string };

export type Faq = {
  /** 表示と JSON-LD の両方に使う。文を一致させるため、プレーンテキストで持つ */
  question: string;
  answer: string;
};

export type FlowStep = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** タイムラインで強調する（期限など）。バッジに出す短い文 */
  highlight?: string;
};

export type Source = { label: string; url: string };

export type SubsidyRow = { target: string; amount: string; note?: string };

export type Feature = {
  title: string;
  body: ReactNode;
  href?: string;
  linkText?: string;
  icon?: LucideIcon;
  image?: ImageAsset;
};

export type IconItem = { icon: LucideIcon; text: string };

/** 補助金の条件。kind で見た目（対象外 / 必須 / 期限）を切り替える */
export type Condition = { title: string; body: string; kind: 'ng' | 'must' | 'date' };

export type WorkCase = {
  district: string; // 例: 名取市◯◯
  house: string; // 新築・既築、屋根の種類
  solar?: string; // 容量・メーカー
  battery?: string;
  subsidy?: string;
  period?: string;
  voice?: string;
  image?: ImageAsset;
};
