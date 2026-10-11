import type { ReactNode } from 'react';

export type BreadcrumbItem = { name: string; path: `/${string}` };

export type Faq = {
  /** 表示と JSON-LD の両方に使う。文を一致させるため、プレーンテキストで持つ */
  question: string;
  answer: string;
};

export type FlowStep = { title: string; description?: string };

export type Source = { label: string; url: string };

export type SubsidyRow = { target: string; amount: string; note?: string };

export type Feature = { title: string; body: ReactNode; href?: string; linkText?: string };

export type WorkCase = {
  district: string; // 例: 名取市◯◯
  house: string; // 新築・既築、屋根の種類
  solar?: string; // 容量・メーカー
  battery?: string;
  subsidy?: string;
  period?: string;
  voice?: string;
  image?: { src: string; alt: string };
};
