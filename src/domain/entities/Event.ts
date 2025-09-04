import type { BaseDoc, Image } from "./common";
export type Event = BaseDoc & {
  title: string;
  description?: string;
  image?: Image;
  location?: string;
  startsAt: Date;
  endsAt?: Date;
};
