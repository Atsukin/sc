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
  /** 強調する一文（期限など）。Lemon Pale のマーカーで出す */
  highlight?: string;
};

export type Source = { label: string; url: string };

export type SubsidyRow = { target: string; amount: string; note?: string };

/** 補助金の条件。kind は文字のラベル（対象外 / 必須 / 期限）で示す */
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
