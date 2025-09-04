import type { BaseDoc } from "./common";
export type NavItem = { label: string; href: string; children?: NavItem[] };
export type Navigation = BaseDoc & { items: NavItem[] };
